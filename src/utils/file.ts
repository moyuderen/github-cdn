export async function parseFile(file: File) {
  const { name } = file;
  const base64 = await readFileContentBase64(file);
  const peerBase64 = base64.split(',')[1];

  return {
    name,
    file,
    base64,
    peerBase64,
  };
}

export function readFileContentBase64(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve((event.target as FileReader).result as string);
    };

    reader.readAsDataURL(file);
  });
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

export const isImageUrl = (url: string): boolean => IMAGE_REGEXP.test(url);
