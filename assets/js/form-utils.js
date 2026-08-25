/* ============================================
   PRM MONTAGE — Delad hjälpfunktion för filbilagor
   Används av contact-form.js (.nt-ajax-form) och modal.js (#hire-form)
   ============================================ */

window.PRMForm = {
  MAX_FILES: 3,
  // Vercel's request body caps out around 4.5 MB and base64 adds ~33% on top of the raw
  // bytes, so keep the raw file total well under that (matches the server-side limit).
  MAX_TOTAL_BYTES: 3 * 1024 * 1024,

  readAttachments: function (fileInput) {
    var PRMForm = window.PRMForm;
    return new Promise(function (resolve, reject) {
      if (!fileInput || !fileInput.files || !fileInput.files.length) {
        resolve([]);
        return;
      }
      var files = Array.prototype.slice.call(fileInput.files).slice(0, PRMForm.MAX_FILES);
      var totalBytes = files.reduce(function (sum, f) { return sum + f.size; }, 0);
      if (totalBytes > PRMForm.MAX_TOTAL_BYTES) {
        reject(new Error('Bilagorna är för stora (max 4 MB totalt). Ta bort någon fil och försök igen.'));
        return;
      }
      Promise.all(
        files.map(function (file) {
          return new Promise(function (res, rej) {
            var reader = new FileReader();
            reader.onload = function () {
              var base64 = String(reader.result).split(',')[1] || '';
              res({ filename: file.name, contentType: file.type, content: base64 });
            };
            reader.onerror = function () { rej(new Error('Kunde inte läsa filen ' + file.name + '.')); };
            reader.readAsDataURL(file);
          });
        })
      ).then(resolve).catch(reject);
    });
  },
};
