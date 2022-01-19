<template>
  <button 
    class="flex flex-row rounded-lg px-1 py-1 border-2 text-white bg-green-500 hover:bg-green-600">
    <CheckIcon class="w-5 h-5 mt-0.5" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    CheckIcon
  },
  setup() {
    
  },
})
</script>
