<template>
  <div class="flex justify-center">
    <div class="justify-center w-full lg:w-3/5">
      <h1 class="text-5xl p-1">Restaurant</h1>
      <div class="border-2 rounded-lg p-2">
        <button class="bg-gray-200 rounded-lg p-1" @click="createRestaurant">
          New restaurant
        </button>
        <input
          class="border-2 rounded-lg p-1 mx-2"
          v-model="restaurant"
          placeholder="Enter restaurant name ..."
        />
        <RestaurantCard
          v-for="restaurant of restaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { computed, defineComponent, ref } from 'vue'
import Restaurant from '@/classes/Restaurant'
import RestaurantCard from '../components/cards/RestaurantCard.vue'

export default defineComponent({
  components: {
    RestaurantCard
  },
  setup() {
    const restaurants = computed(() => store.state.restaurants)

    let restaurant = ref('')
    const createRestaurant = () => {
      store.dispatch('createNewRestaurant', new Restaurant(restaurant.value))
      restaurant.value = ''
    }

    return {
      restaurants,
      restaurant,
      createRestaurant,
    }
  },
})
</script>