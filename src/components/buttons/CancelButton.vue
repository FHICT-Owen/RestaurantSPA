<template>
  <button 
    class="flex flex-row text-blue-400 rounded-lg px-1 py-1 border-2 border-blue-400 hover:bg-gray-100">
    <XCircleIcon class="w-5 h-5 mt-0.5" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { XCircleIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    XCircleIcon
  },
  setup() {
    
  },
})
</script>
