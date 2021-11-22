<template>
  <button 
    class="flex flex-row px-3 py-1 rounded-3xl text-white bg-red-500 hover:bg-red-600">
    <TrashIcon class="w-5 h-5 mt-0.5" />Delete
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TrashIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    TrashIcon
  },
  setup() { }
})
</script>
