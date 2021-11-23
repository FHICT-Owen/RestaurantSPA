<template>
  <div 
    class="flex flex-row rounded-3xl h-24 mt-2"
    style="box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1)">
    <div 
      class="rounded-3xl m-1 bg-blend-normal bg-cover bg-no-repeat" 
      :style="{background: dish.image, minHeight: imgSize, minWidth: imgSize}">
    </div>
    <div class="flex-1 m-1">
      <h5 class="font-medium text-lg">{{dish.name}}</h5>
      <p class="text-gray-400" style="font-size: 0.85rem; line-height: 1rem">{{dish.description}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    dish: {
      type: Object as PropType<Dish>,
      required: true
    }
  },
  setup (props) {
    return { imgSize: ref('88px') }
  }
})
</script>
