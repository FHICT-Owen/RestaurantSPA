<template>
  <div class="flex justify-center">
    <div class="justify-center w-full mx-2 lg:w-3/5">
      <h1 class="text-5xl p-1 my-4">My Restaurants</h1>
      <div class="ring-1 ring-gray-200 rounded-lg p-2 bg-white">
        <button class="bg-gray-200 rounded-lg py-1.5 px-2 m-1" @click="createRestaurant">
          Add Restaurant
        </button>
        <input
          class="border-2 rounded-lg p-1 m-1"
          v-model="restaurant"
          placeholder="Restaurant name"
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
import { Restaurant } from '../classes'
import RestaurantCard from '../components/cards/RestaurantCard.vue'

export default defineComponent({
  components: {
    RestaurantCard
  },
  setup() {
    const restaurants = computed(() => store.state.restaurants)

    let restaurant = ref('')
    const createRestaurant = () => {
      store.commit('addRestaurant', new Restaurant(restaurant.value))
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