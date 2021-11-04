<template>
  <DialogBackground @click="close">
    <dialog class="flex shadow-lg w-80 h-24 bg-white rounded-3xl z-50 top-1/2 m-0 p-0" style="transform: translateY(-50%)">
      <div class="flex flex-col w-full justify-between p-0 m-0">
        <div class="flex-1"></div>
        <div class="flex justify-center">
          <p class="text-center">{{object.name}}</p>
        </div>
        <div class="flex flex-row align-bottom w-full">
          <button class="w-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-bl-3xl" @click="deleteCategory">Yes</button>
          <button class="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-br-3xl" @click="close">No</button>
        </div>
      </div>
    </dialog>
  </DialogBackground>
</template>

<script lang="ts">
import store from '@/store'
import DialogBackground from './DialogBackground.vue'

export default ({
  components: {
    DialogBackground
  },
  props: {
    object: {}
  },
  setup(props: { object: {} }){
    const deleteCategory = () => {
      store.dispatch('deleteCategory', props.object).then(() => {
        store.dispatch('getAllCategories')
        store.state.isConfirmDialogOpen = false
      })
    }
    const close = () => {
      store.state.isConfirmDialogOpen = false
    }
    return {deleteCategory, close}
  }
})
</script>
