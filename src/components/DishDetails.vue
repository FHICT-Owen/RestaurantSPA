<template>
    <div class="flex flex-col sm:flex-row">
      <img :src="dish.image.slice(5,dish.image.length-2)" style="aspect-ratio: '1 / 1'; max-width: 300px;">
      <div class="flex flex-col m-1">
        <h1 class="flex font-bold text-lg justify-center items-center">{{dish.name}}</h1>
           
        <h2 class="center font-medium text-lg">{{dish.category}}</h2>
        <h2 class="center font-light text-lg">{{dish.description}}</h2>
        <h2 class="center font-medium text-lg">{{dish.dietaryRestrictions}}</h2>
        <h2 class="center font-medium text-lg">{{dish.ingredients}}</h2>
        <h2 class="center font-medium text-lg">€{{dish.prize}}.-</h2>   
      </div>
    </div>
</template>

<script lang="ts">
import { Dish } from '@/types'
import { computed, defineComponent, PropType, ref, onMounted } from 'vue'

export default defineComponent({
  props: {
    dish: {
      type: Object as PropType<Dish>,
      required: true
    },
  },
  setup(props) {
    console.log(props.dish)
    return {
    }
  },
})
</script>
