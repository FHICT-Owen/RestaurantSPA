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
      <p class="font-med text-base text-gray-400">{{dish.description}}</p>
    </div>
    <div class="flex flex-col justify-center space-y-1 m-2">
      <div
        class="bg-no-repeat bg-blend-normal w-9 h-9 bg-cover plus-icon"
        @click="openEditDialog">
      </div>
      <div
        class="bg-no-repeat bg-blend-normal w-9 h-9 bg-cover plus-icon"
        @click="openEditDialog">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { ref } from 'vue'

export default ({
  props: {
    dish: {} as Dish
  },
  setup (props: { dish: Dish }) {
    function openEditDialog() {
      store.dispatch('toggleDialog', true)
      store.dispatch('setCurrentDish', props.dish)
    }
    return { openEditDialog, imgSize: ref('88px') }
  }
})
</script>

<style>
.plus-icon {
  background: url(../assets/plus.png);
}
</style>
