<template>
  <div 
    class="flex flex-col">
    <div class="flex flex-row rounded-3xl h-24 mt-6" style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1)">
      <div 
        class="rounded-3xl m-1 bg-blend-normal bg-cover bg-no-repeat" 
        :style="{background: dish.image, minHeight: imgSize, minWidth: imgSize}">
      </div>
      <div class="flex-1 m-1">
        <h5 class="font-medium text-lg">{{dish.name}}</h5>
        <p class="text-gray-400" style="font-size: 0.85rem; line-height: 1rem">{{dish.description}}</p>
      </div>
    </div>
    <div v-if="isInSession" class="flex flex-row justify-around rounded-3xl mt-1.5 h-10">
      <button class="bg-gray-400 text-white font-medium text-sm w-full rounded-l-3xl p-1 my-1 ml-1 mr-0.5">ADD</button>
      <button class="bg-red-400 text-white font-medium text-sm w-full  rounded-r-3xl p-1 my-1 ml-0.5 mr-1">REMOVE</button>
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
