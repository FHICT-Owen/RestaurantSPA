import store from './store'

export const toBase64URL = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(`url("${reader.result}")`)
  reader.onerror = error => reject(error)
})

export const showPopUp = (text: string, isError: boolean) => {
  store.state.popUps.push({ text: isError ? 'Error occurred' : `${text}`, isError: isError})
  setTimeout(() => store.state.popUps.splice(0,1), 3000)
}

export const setAuthHeader = () => {
  return {
    headers: { authorization: `Bearer ${store.state.apiToken}` }
  }
}

export const countedDishes = (dishes:string[]) => {
  dishes.reduce(function (allDishes:any, dish:string){
    if (dish in allDishes) 
      allDishes[dish]++
    else allDishes[dish] = 1
    return allDishes
  }, {})
}