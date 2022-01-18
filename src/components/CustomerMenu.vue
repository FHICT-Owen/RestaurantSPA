<template>
  <div >
    <div id="navbar" class="flex flex-col overflow-hidden z-50" style="background-color: #FFA825">
      <input 
        v-model="keyword" 
        :placeholder="$t('search_bar')"
        class="justify-center shadow-sm rounded-3xl h-10 p-3 mt-1 w-11/12 m-auto mb-4"/>
      <div class="flex flex-row overflow-x-scroll bg-white">
        <div 
          id="all" 
          @click="setCategoryAll"
          class="no-underline capitalize py-2 px-4 mx-2 my-2.5 cursor-pointer select-none whitespace-nowrap">
          All
        </div>
        <div
          v-for="category in categories"
          :id="category.name"
          :key="category.id"
          @click="setCategory(category.name || category.name_NL)"
          :tabindex="category.id"
          class="no-underline capitalize py-2 px-4 my-2.5 cursor-pointer select-none whitespace-nowrap">
          <div v-if="lang == 'en' ">{{ category.name }}</div>
          <div v-else-if="lang == 'nl'">{{ category.name_NL }}</div>
        </div>
      </div>
    </div>
    <div class="capitalize mx-2">
      <div >
        <!-- <div v-for="category in selectedCategory" :key="category.id"> -->
          <h2 class="text-3xl mt-5" v-if="((!!categoryFilter) ? categoryFilter == category : true)">{{ category }}</h2>
          <div v-for="(dish, index) in filteredDishes" :key="index">
            <DishCard v-if="((!!categoryFilter) ? categoryFilter == category : true)" :dish="dish" />
            <!-- && checkIfDishCanBeMade(dish) -->
          </div>
        <!-- </div> -->
      </div>
      <div class="h-28"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import store from '@/store'
import DishCard from './cards/DishCard.vue'
import { Dish } from '@/types'

export default defineComponent({
  components: {
    DishCard
  },
  setup() {
    const categoryFilter = computed(() => store.state.categoryFilter)
    const categories = computed(() => 
      store.state.categories.filter(c => store.state.dishes.find(d => d.category == c.name))
    )
    const dishes = computed(() => store.state.dishes)
    let keyword = ref('')

    const setCategoryAll = () =>
      store.commit('setCategoryFilter', null)

    const setCategory = (selectedCategory:string) => {
      console.log(selectedCategory)
      store.commit('setCategoryFilter', selectedCategory)
    }

    const filteredDishes = computed(() => lang.value === 'en' ?
      dishes.value.filter(({name}) => 
        name.toLowerCase().includes(keyword.value.toLowerCase())) : dishes.value.filter(({name_NL}) => 
        name_NL.toLowerCase().includes(keyword.value.toLowerCase())))

    const selectedCategory = computed(() => store.state.selectedCategory)

    const checkIfDishCanBeMade = (dish: Dish) =>
      dish.ingredients.some((x) => 
        store.state.ingredients.filter(d => d.isInStock && x == d.name))

    const manageStickyNav = (navbar: HTMLElement | null) => {
      if(!!navbar) {
        window.pageYOffset >= navbar.offsetTop ? 
          navbar.classList.add('sticky') : navbar.classList.remove('sticky')
      }
    }
    
    let lang = ref('')

    onMounted(() => {
      lang.value = localStorage.getItem('lang') || 'en'
      let navbar = document.getElementById('navbar')
      window.addEventListener('scroll', () => manageStickyNav(navbar))
      store.commit('setSelectedCategory', 'all')
      store.commit('setCategoryFilter', null)

      const all = document.getElementById('all')
      if (!!all) all.classList.add('select')
    })

    return {
      categories,
      dishes,
      filteredDishes,
      keyword,
      selectedCategory,
      lang,
      checkIfDishCanBeMade,
      categoryFilter,
      setCategoryAll,
      setCategory
    }
  }
})
</script>

<style scoped>
/* The sticky class is added to the navbar with JS when it reaches its scroll position */
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.select {
  background-color: orange;
  border-radius: 20px;
  color: white;
}
</style>