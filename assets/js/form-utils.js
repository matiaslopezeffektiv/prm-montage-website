/* ============================================
   PRM MONTAGE — Delad hjälpfunktion för filbilagor
   Används av contact-form.js (.nt-ajax-form) och modal.js (#hire-form)

   Filer laddas upp direkt från webbläsaren till Vercel Blob (se api/blob-upload.js)
   istället för att base64-kodas in i formulärets JSON-body. Det gör att vi kan tillåta
   betydligt större bilagor än Vercels 4,5 MB-gräns för serverless-funktioners request-body
   (som annars slår till fort när base64 lägger på ~33% overhead).
   ============================================ */

window.PRMForm = {
  MAX_FILES: 3,
  MAX_TOTAL_BYTES: 10 * 1024 * 1024,

  _uploadModulePromise: null,
  _loadUploadFn: function () {
    if (!window.PRMForm._uploadModulePromise) {
      window.PRMForm._uploadModulePromise = import('https://esm.sh/@vercel/blob/client')
        .then(function (mod) { return mod.upload; });
    }
    return window.PRMForm._uploadModulePromise;
  },

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
        reject(new Error('Bilagorna är för stora (max 10 MB totalt). Ta bort någon fil och försök igen.'));
        return;
      }

      PRMForm._loadUploadFn()
        .then(function (upload) {
          return Promise.all(
            files.map(function (file) {
              return upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/blob-upload',
              }).then(function (blob) {
                return { filename: file.name, url: blob.url };
              });
            })
          );
        })
        .then(resolve)
        .catch(function () {
          reject(new Error('Kunde inte ladda upp bilagorna. Försök igen eller skicka utan bilagor.'));
        });
    });
  },
};
