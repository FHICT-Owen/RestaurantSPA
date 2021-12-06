<template>
  <DialogBackground :close="closeDialog">
    <dialog 
      class="flex shadow-lg w-80 h-28 rounded-3xl z-50 top-1/2 p-0" 
      style="transform: translateY(-50%)">
      <div class="flex flex-col w-full">
        <div class="text-center px-8 py-4">Are you sure you want to delete {{object.name}}?</div>
        <div class="flex flex-row align-bottom w-full">
          <button class="w-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-bl-3xl" @click="deleteObject">Yes</button>
          <button class="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-br-3xl" @click="closeDialog">No</button>
        </div>
      </div>
    </dialog>
  </DialogBackground>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from '@vue/runtime-core'
import store from '@/store'
import DialogBackground from './DialogBackground.vue'

export default defineComponent({
  components: {
    DialogBackground
  },
  setup() {
    return {
      object: ref(store.state.currentConfirmDialogObject),
      deleteObject: () => store.dispatch('deleteObject'),
      closeDialog: () => store.commit('closeConfirmDialog')
    }
  }
})
</script>
