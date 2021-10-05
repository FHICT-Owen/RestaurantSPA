export function convertNumberArrayToImageUrl(image: number[]): string {
    return `url("data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(image)))}")`
}

export async function convertFileToNumberArray(image: File): Promise<number[]> {
    console.log(image)
    return image.arrayBuffer().then(result => ([...new Uint8Array(result)]))
}