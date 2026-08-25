/* ============================================
   PRM MONTAGE — Hire Modal (modal.js)
   Öppnas via .hire-btn på alla sidor
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const overlay = document.getElementById('nt-hire-modal');
  if (!overlay) return;

  // Öppna modal via alla knappar med class hire-btn
  document.querySelectorAll('.hire-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Stäng via close-knapp
  const closeBtn = overlay.querySelector('.nt-modal__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Stäng via klick utanför modal
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Stäng via Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Formulär submit — skickas via /api/contact (Resend)
  const form = overlay.querySelector('#hire-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('.nt-submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Skickar...';
      submitBtn.disabled = true;

      const fileInput = form.querySelector('input[type="file"]');
      const formData = new FormData(form);
      if (fileInput && fileInput.name) formData.delete(fileInput.name);
      const data = Object.fromEntries(formData.entries());
      data.type = 'hire';

      window.PRMForm.readAttachments(fileInput)
        .then(function (attachments) {
          data.attachments = attachments;
          return fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        })
        .then(function (res) {
          return res.json().then(function (body) {
            if (!res.ok) throw new Error(body.error || 'Något gick fel.');
            return body;
          });
        })
        .then(function () {
          form.innerHTML = '<div style="text-align:center;padding:40px 0"><i class="fas fa-check-circle" style="font-size:3rem;color:#1FA968;margin-bottom:16px;display:block"></i><h4 style="color:#1F5C50;font-weight:700">Tack för din förfrågan!</h4><p style="color:#63706D">Vi återkommer så snart vi kan.</p></div>';
        })
        .catch(function (err) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          alert(err.message || 'Kunde inte skicka förfrågan. Försök igen eller ring oss direkt.');
        });
    });
  }

});
