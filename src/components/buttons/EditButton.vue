<template>
  <button 
    class="flex flex-row justify-center rounded-lg px-2 py-1 text-white bg-yellow-400 hover:bg-yellow-500">
    <PencilIcon class="w-5 h-5 mt-0.5" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PencilIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    PencilIcon
  },
  setup() {
    
  },
})
</script>
