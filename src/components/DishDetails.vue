<template>
    <div class="flex flex-col justify-center items-center">
      <img class="rounded-md" :src="dish.image.slice(5,dish.image.length-2)" style="aspect-ratio: 1/1; max-width: 300px; max-height: 300px;">
      <div class="flex flex-col m-1">
        <div class="rounded-2xl bg-gray-100 p-4 w-4/5 m-auto">
          <div class="flex flex-row justify-around">
            <h1 class="flex font-semibold text-lg justify-center items-center">{{dish.name}}</h1>
            <h2 class=" font-light text-lg"> €{{(dish.prize < 0 ? 0.00 : dish.prize).toFixed(2)}}</h2>
          </div>
          <h2 class="font-light text-lg">{{dish.description}}</h2>
          <h2 class="font-medium text-lg">Ingredients:</h2>
          <p class="font-light text-lg"> {{dish.ingredients.join(', ')}}</p>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Dish } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    dish: {
      type: Object as PropType<Dish>,
      required: true
    }
  },
  setup(props) {}
})
</script>
