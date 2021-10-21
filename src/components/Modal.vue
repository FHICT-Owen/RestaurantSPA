<template>
  <dialog class="flex shadow-lg w-80 h-24 bg-white rounded-3xl z-50 top-1/2 m-0 p-0">
    <div class="flex flex-col w-full justify-between p-0 m-0">
      <div class="flex-1"></div>
      <div class="flex justify-center">
        <p class="text-center">{{ingredient.text}}</p>
      </div>
      <div class="flex flex-row align-bottom w-full">
        <button class="w-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-bl-3xl" @click="setAllergen">Yes</button>
        <button class="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-br-3xl" @click="dontSetAllergen">No</button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts">
import store from '@/store'

export default ({
  props: {
    ingredient: {
      text: '',
      name: ''
    }
  },
  setup(props: {ingredient: { text: string, name: string }}) {
    const setAllergen = () => {
      store.dispatch('createNewIngredient', {id: 0, name: props.ingredient.name, isAllergen: true}).then(() => 
        store.dispatch('getAllIngredients'))
      store.state.isModalOpen = false
    }
    const dontSetAllergen = () => {
      store.dispatch('createNewIngredient', {id: 0, name: props.ingredient.name, isAllergen: false}).then(() => 
        store.dispatch('getAllIngredients'))
      store.state.isModalOpen = false
    }
    return { setAllergen, dontSetAllergen }
  }
})
</script>
