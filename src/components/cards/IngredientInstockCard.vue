<template>
  <div 
    @click="toggleIsInStock" 
    :class="isInStock ? 'border-green-600' : 'border-red-600'" 
    class="flex flex-row flex-grow-0 border-2 m-0.5 p-1.5 shadow rounded-3xl gap-2 cursor-pointer">
	  <div>{{ingredient.name}}</div>
  </div>	
</template>

<script lang="ts">
import { Ingredient } from '@/classes'
import store from '@/store'
import { computed, defineComponent } from '@vue/runtime-core'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    ingredient: {
      type: Object as PropType<Ingredient>,
      required: true
    },
  },
  setup(props) { 

    const toggleIsInStock = () => {
      store.commit('editIngredient', new Ingredient(props.ingredient.id, props.ingredient.restaurantId, props.ingredient.name, props.ingredient.name_NL, props.ingredient.isAllergen, !props.ingredient.isInStock) )
    }
    return { 
      isInStock: computed(() => props.ingredient.isInStock),
      toggleIsInStock
    }
  }
})
</script>
