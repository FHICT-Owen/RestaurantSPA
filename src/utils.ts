import store from './store'

export const toBase64URL = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(`url("${reader.result}")`)
  reader.onerror = error => reject(error)
})

export function showPopUp(name: string, callType: string, isError: boolean) {
  store.state.popUps.push({text: isError ? 'Error occurred' : `${name} successfully ${callType}!`, isError: isError})
  setTimeout(() => { 
    const i = store.state.popUps.indexOf({text: isError ? 'Error occurred' : `${name} successfully ${callType}!`, isError: isError})
    store.state.popUps.splice(i, 1) 
  }, 3000)
}
