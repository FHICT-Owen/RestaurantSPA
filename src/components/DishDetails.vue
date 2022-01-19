<template>
    <div>
      <div class="flex flex-col m-1">
        <h1 class="flex font-bold text-lg justify-center items-center">{{dish.name}}</h1>
        <div class="flex rounded-3xl bg-no-repeat bg-cover bg-blend-normal" :style="{background: dish.image, minHeight: '250px', minWidth: '260px'}"></div>   
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
