<template>
  <button 
    class="flex flex-row text-yellow-400 justify-center rounded-lg px-2 py-1 border-2 border-yellow-400 hover:bg-gray-100">
    <PencilIcon class="w-5 h-5 mt-0.5" />Edit
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
