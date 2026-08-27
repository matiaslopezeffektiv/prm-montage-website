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

  const { name, email, phone, service, message, address, postalCode, city, area, type, attachments } = req.body || {};

  if (!name || !phone) {
    res.status(400).json({ error: 'Namn och telefonnummer krävs.' });
    return;
  }

  // Hero-formuläret (type "offert") saknar adressfält med flit för att hålla den
  // låg-friktionsupplevelsen ovanför vikningen — kravet gäller övriga formulär.
  if (type !== 'offert' && (!address || !postalCode || !city)) {
    res.status(400).json({ error: 'Adress, postnummer och stad krävs.' });
    return;
  }

  const MAX_FILES = 3;
  // Filerna laddas upp direkt från webbläsaren till Vercel Blob (se api/blob-upload.js) och
  // förbi serverless-funktionens 4,5 MB request-body-gräns — den här funktionen får bara
  // tillbaka blob-URL:er (korta strängar), inte filinnehållet. Den riktiga storleksgränsen
  // (10 MB per fil) sätts vid tokengenereringen i api/blob-upload.js; här kontrolleras bara
  // den sammanlagda storleken en gång till som ett extra skyddslager.
  const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
  // Endast blobs från vår egen publika store accepteras, så formuläret inte kan missbrukas
  // som en öppen relä för att få Resend att hämta godtyckliga externa URL:er.
  const BLOB_HOST_SUFFIX = '.public.blob.vercel-storage.com';

  let safeAttachments = [];
  if (Array.isArray(attachments) && attachments.length) {
    if (attachments.length > MAX_FILES) {
      res.status(400).json({ error: `Max ${MAX_FILES} bilagor per förfrågan.` });
      return;
    }
    for (const file of attachments) {
      if (!file || typeof file.url !== 'string' || !file.filename) continue;
      let parsed;
      try {
        parsed = new URL(file.url);
      } catch {
        res.status(400).json({ error: 'Ogiltig bilaga.' });
        return;
      }
      if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith(BLOB_HOST_SUFFIX)) {
        res.status(400).json({ error: 'Ogiltig bilaga.' });
        return;
      }
      safeAttachments.push({ filename: file.filename, url: file.url });
    }

    if (safeAttachments.length) {
      let totalBytes = 0;
      for (const file of safeAttachments) {
        try {
          const head = await fetch(file.url, { method: 'HEAD' });
          totalBytes += Number(head.headers.get('content-length') || 0);
        } catch {
          res.status(400).json({ error: 'Kunde inte verifiera en bilaga. Försök igen.' });
          return;
        }
      }
      if (totalBytes > MAX_TOTAL_BYTES) {
        res.status(400).json({ error: 'Bilagorna är för stora (max 10 MB totalt).' });
        return;
      }
    }
  }

  const headings = {
    offert: 'Ny offertförfrågan',
    jour: 'AKUT — Jourförfrågan',
    contact: 'Nytt meddelande från kontaktformuläret',
    area: 'Ny förfrågan från ortssida',
  };
  const heading = headings[type] || headings.contact;
  const subject = (type === 'jour' ? 'JOUR: ' : '') + 'Ny förfrågan via prmmontage.se';

  const html = `
    <h2>${heading}</h2>
    <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
    ${email ? `<p><strong>E-post:</strong> ${escapeHtml(email)}</p>` : ''}
    ${service ? `<p><strong>Tjänst:</strong> ${escapeHtml(service)}</p>` : ''}
    ${address ? `<p><strong>Adress:</strong> ${escapeHtml(address)}${postalCode ? ', ' + escapeHtml(postalCode) : ''}${city ? ' ' + escapeHtml(city) : ''}</p>` : ''}
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
      attachments: safeAttachments.length
        ? safeAttachments.map((f) => ({ filename: f.filename, path: f.url }))
        : undefined,
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
