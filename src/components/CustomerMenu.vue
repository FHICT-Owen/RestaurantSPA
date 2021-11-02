<template>
  <div>
    <div id="navbar" class="flex flex-col bg-gray-200 w-full overflow-hidden z-50">
      <input v-model="keyword" class="justify-center shadow-sm rounded-3xl h-10 p-3" placeholder="Search for your dish..." />
      <div class="flex flex-row justify-between">
        <button
          v-for="category in categories"
          :key="category.id"
          :href="`#${category.name}`"
          class="no-underline capitalize p-4"
          >{{ category.name }}</button
        >
      </div>
    </div>
    <div class="capitalize container">
      <div>
        <div v-for="category in categories" :key="category.id">
          <h2 class="text-5xl mt-5">{{ category.name }}</h2>
          <a :id="category.name" class="anchor"></a>
          <div v-for="(dish, index) in filterDishes" :key="index">
            <Dish v-if="dish.category == category.name" :dish="dish" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import store from '@/store'
import Dish from '../components/Dish.vue'

export default {
  name: 'CostumerMenu',
  components: {
    Dish,
  },
  setup() {
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)
    let keyword = ref('')
    const filterDishes = computed(() => 
      dishes.value.filter(({ name }) => 
        name.toLowerCase().includes(keyword.value.toLowerCase())))

    const manageStickyNav = (navbar: HTMLElement | null) => {
      if(navbar != null) {
        window.pageYOffset >= navbar.offsetTop ? 
          navbar.classList.add('sticky') : navbar.classList.remove('sticky')
      }
    }

    onMounted(() =>{
      let navbar = document.getElementById('navbar')
      window.addEventListener('scroll', () => manageStickyNav(navbar))
    })

    return {
      categories,
      dishes,
      filterDishes,
      keyword
    }
  }
}
</script>

<style>
/* The sticky class is added to the navbar with JS when it reaches its scroll position */
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>