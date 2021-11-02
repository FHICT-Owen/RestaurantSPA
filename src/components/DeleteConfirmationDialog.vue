<template>
  <dialog class="flex shadow-lg w-80 h-24 bg-white rounded-3xl z-50 top-1/2 m-0 p-0">
    <div class="flex flex-col w-full justify-between p-0 m-0">
      <div class="flex-1"></div>
      <div class="flex justify-center">
        <p class="text-center">{{name}}</p>
      </div>
      <div class="flex flex-row align-bottom w-full">
        <button class="w-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-bl-3xl" @click="deleteCategory">Yes</button>
        <button class="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-br-3xl" @click="close">No</button>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts">
import store from '@/store'
import { ref } from 'vue'

export default ({
   props: {
      category: {} as Category
  },
  setup(props: {category: Category }){
    const deleteCategory = () => {
      store.dispatch('deleteCategory', props.category).then(() => {
        store.dispatch('getAllCategories')
        store.state.isConfirmDialogOpen = false;
      })
    }
    const close = () => {
      store.state.isConfirmDialogOpen = false;
    }
    return {deleteCategory, close,  name: ref(props.category.name)}
  }
})
</script>
