<template>
  <button 
    class="flex flex-row px-2 py-1 justify-center rounded-lg text-white bg-yellow-400 hover:bg-yellow-500">
    <PrinterIcon class="w-5 h-5 mt-0.5" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PrinterIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    PrinterIcon
  },
  setup() {
    
  },
})
</script>
