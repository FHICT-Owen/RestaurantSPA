<template>
  <div>
    <div 
      class="fixed flex flex-col rounded-3xl p-3 m-4 h-20 mt-6 z-50 bottom-0 bg-white" 
      style="transform: translate(0.1vw); width: 92%; box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);">
      <div class="flex flex-row justify-between h-7">
          <p class="text-2xl" style="color:#148F00">€40.34</p>
          <p>Preparing...</p>
          <button class="rounded-lg px-1 text-sm w-16" style="color:#148F00; border: 2px solid;" @click=""> ORDER </button>
      </div>
      <div class="flex-row">
          <textarea class="resize-none mt-1" v-model="message" rows="1" placeholder="Comments..." />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return { imgSize: ref('88px'), isInSession: ref(false) }
  }
})
</script>
