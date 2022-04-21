export async function warpFile(file) {
  const base64 = await file2Base64(file)
  const pureBase64 = base64.split(',')[1]

  return {
    name: file.name,
    file,
    base64,
    pureBase64,
  }
}

function file2Base64(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve((event.target as FileReader).result as string)
    }
    reader.readAsDataURL(file)
  })
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i

export const isImageUrl = (url: string): boolean => IMAGE_REGEXP.test(url)
