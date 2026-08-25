const { Resend } = require('resend');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY saknas i miljövariablerna.');
    res.status(500).json({ error: 'E-postutskick är inte konfigurerat än. Kontakta oss direkt på telefon.' });
    return;
  }

  const { name, email, phone, service, message, address, area, type, attachments } = req.body || {};

  if (!name || !phone) {
    res.status(400).json({ error: 'Namn och telefonnummer krävs.' });
    return;
  }

  const MAX_FILES = 3;
  // Vercel's serverless request body is capped around 4.5 MB total, and base64 adds ~33%
  // overhead on top of the raw file bytes — cap the raw size well under that ceiling.
  const MAX_TOTAL_BYTES = 3 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];

  let safeAttachments = [];
  if (Array.isArray(attachments) && attachments.length) {
    if (attachments.length > MAX_FILES) {
      res.status(400).json({ error: `Max ${MAX_FILES} bilagor per förfrågan.` });
      return;
    }
    let totalBytes = 0;
    for (const file of attachments) {
      if (!file || typeof file.content !== 'string' || !file.filename) continue;
      if (file.contentType && !ALLOWED_TYPES.includes(file.contentType)) {
        res.status(400).json({ error: 'Endast bilder (JPG/PNG/WEBP/HEIC) eller PDF kan bifogas.' });
        return;
      }
      totalBytes += Math.ceil((file.content.length * 3) / 4);
      if (totalBytes > MAX_TOTAL_BYTES) {
        res.status(400).json({ error: 'Bilagorna är för stora (max 4 MB totalt).' });
        return;
      }
      safeAttachments.push({ filename: file.filename, content: file.content });
    }
  }

  const headings = {
    offert: 'Ny offertförfrågan',
    jour: 'AKUT — Jourförfrågan',
    contact: 'Nytt meddelande från kontaktformuläret',
    area: 'Ny förfrågan från ortssida',
  };
  const heading = headings[type] || headings.contact;
  const subject = (type === 'jour' ? 'JOUR: ' : '') + 'Ny förfrågan via pro-montage.se';

  const html = `
    <h2>${heading}</h2>
    <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
    ${email ? `<p><strong>E-post:</strong> ${escapeHtml(email)}</p>` : ''}
    ${service ? `<p><strong>Tjänst:</strong> ${escapeHtml(service)}</p>` : ''}
    ${address ? `<p><strong>Adress:</strong> ${escapeHtml(address)}</p>` : ''}
    ${area ? `<p><strong>Område:</strong> ${escapeHtml(area)}</p>` : ''}
    ${message ? `<p><strong>Meddelande:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
    ${safeAttachments.length ? `<p><strong>Bilagor:</strong> ${safeAttachments.map((f) => escapeHtml(f.filename)).join(', ')}</p>` : ''}
  `;

  try {
    const toEmails = process.env.CONTACT_TO_EMAIL
      ? process.env.CONTACT_TO_EMAIL.split(',').map((addr) => addr.trim())
      : ['info@pro-montage.se', 'matias@effektivmedia.nu'];

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'PRM Montage <no-reply@effektivmedia.nu>',
      to: toEmails,
      reply_to: email || undefined,
      subject,
      html,
      attachments: safeAttachments.length ? safeAttachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      res.status(500).json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' });
  }
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
