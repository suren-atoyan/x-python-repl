function getSigningUrl(workflowId: string): string {
  return `/applications/${workflowId}/presigned_upload_url`;
}

function convertBlobToBase64(blob: File | Blob, cb: (base64: string) => void) {
  const reader = new FileReader();

  reader.onload = () => {
    if (reader.result) {
      cb(reader.result.toString());
    }
  };

  reader.readAsDataURL(blob);
}

async function convertBase64ToBlob(base64: string) {
  const response = await fetch(base64, { mode: 'cors' });
  const blobObject = await response.blob();

  return URL.createObjectURL(blobObject);
}

export { getSigningUrl, convertBlobToBase64, convertBase64ToBlob };
