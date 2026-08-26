const { handleUpload } = require('@vercel/blob/client');

// Samma tillåtna filtyper som tidigare (bas64-baserade) bilage-flödet i api/contact.js.
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];
// Vercel Blobs klientuppladdning går direkt browser -> Blob, förbi serverless-funktionens
// 4,5 MB request-body-gräns, så gränsen här är den riktiga filstorleken (inte base64).
const MAX_FILE_BYTES = 10 * 1024 * 1024;

module.exports = async function handler(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: MAX_FILE_BYTES,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });

    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
