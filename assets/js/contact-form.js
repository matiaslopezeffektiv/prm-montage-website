/* ============================================
   PRM MONTAGE — Formulär (hero, kontakt, jour, ortssidor)
   Alla formulär med klassen .nt-ajax-form skickas till /api/contact
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('.nt-ajax-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var messageBox = form.querySelector('.nt-form-message');
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    function showMessage(text, isError) {
      if (!messageBox) return;
      messageBox.textContent = text;
      messageBox.style.display = 'block';
      messageBox.style.background = isError ? '#fdecea' : '#e7f7ef';
      messageBox.style.color = isError ? '#b3261e' : '#0f6b3c';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (messageBox) messageBox.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Skickar...';
      }

      var data = Object.fromEntries(new FormData(form).entries());
      data.type = form.getAttribute('data-form-type') || 'contact';

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          return res.json().then(function (body) {
            if (!res.ok) throw new Error(body.error || 'Något gick fel.');
            return body;
          });
        })
        .then(function () {
          showMessage('Tack! Vi återkommer till dig så snart vi kan.', false);
          form.reset();
        })
        .catch(function (err) {
          showMessage(err.message || 'Kunde inte skicka meddelandet. Försök igen eller ring oss direkt.', true);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        });
    });
  });
});
