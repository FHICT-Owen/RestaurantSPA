<template>
  <div class="flex flex-row flex-grow-0 m-0.5 p-1.5 shadow rounded-3xl">
		{{ingredient}} <XCircleIcon @click="removeIngredient" class="w-6 h-6 hover:opacity-60 text-red-600 cursor-pointer" />
  </div>	
</template>

<script lang="ts">
import store from '@/store'
import { defineComponent } from '@vue/runtime-core'
import { XCircleIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    XCircleIcon
  },
  props: {
    ingredient: {
      type: String,
      required: true
    }
  },
  setup(props) { 
    return { removeIngredient: () => store.dispatch('removeIngredientFromCurrentDish', props.ingredient) }
  }
})
</script>
