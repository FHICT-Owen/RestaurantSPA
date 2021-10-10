import store from './store'

export function convertNumberArrayToImageUrl (image: number[]): string {
  return `url("data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(image)))}")`
}

export async function convertFileToNumberArray (image: File): Promise<number[]> {
  return image.arrayBuffer().then(result => ([...new Uint8Array(result)]))
}

export function showPopUp(name: string, callType: string, isError: boolean) {
  store.state.popUps.push({text: isError ? 'Error occurred' : `${name} successfully ${callType}!`, isError: isError})
  setTimeout(() => { 
    const i = store.state.popUps.indexOf({text: isError ? 'Error occurred' : `${name} successfully ${callType}!`, isError: isError})
    store.state.popUps.splice(i, 1) 
  }, 3000)
}
