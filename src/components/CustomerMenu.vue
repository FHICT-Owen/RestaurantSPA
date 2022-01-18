<template>
  <div>
    <button class="rounded py-1 px-3 mx-1 my-2 bg-blue-500 text-white" v-if="dishDetailsIsOpen" @click="toggleDishDetails">Go back</button>
    <DishDetails v-if="dishDetailsIsOpen" :dish="currentDishDetails"/>
    <div v-else-if="!dishDetailsIsOpen">
      <div id="navbar" class="flex flex-col overflow-hidden z-50" style="background-color: #FFA825">
        <input 
          v-model="keyword" 
          :placeholder="$t('search_bar')"
          class="justify-center shadow-sm rounded-3xl h-10 p-3 mt-1 w-11/12 m-auto mb-4"/>
        <div class="flex flex-row overflow-x-scroll bg-white">
          <div 
            id="all" 
            @click="setCategory(null)"
            :class="{'select': !categoryFilter}"
            class="no-underline capitalize py-2 px-4 mx-2 my-2.5 cursor-pointer select-none whitespace-nowrap">
            All
          </div>
          <div
            v-for="category in categories"
            :id="category.name"
            :key="category.id"
            @click="setCategory(category.name)"
            :tabindex="category.id"
            :class="{'select': categoryFilter == category.name}"
            class="no-underline capitalize py-2 px-4 my-2.5 cursor-pointer select-none whitespace-nowrap">
            <div>{{lang == 'en' ? category.name : category.name_NL}}</div>
          </div>
        </div>
      </div>
      <div class="capitalize mx-2">
        <div v-for="category in categories" :key="category.id">
          <div v-if="((!!categoryFilter) ? categoryFilter == category.name : true)">
            <h2 class="text-3xl mt-5">{{lang == 'en' ? category.name : category.name_NL}}</h2>
            <div v-for="(dish, index) in filteredDishes" :key="index">
              <DishCard  @click="toggleDishDetails(dish)" v-if="category.name == dish.category " :dish="dish" />
              <!-- && checkIfDishCanBeMade(dish)  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import store from '@/store'
import DishDetails from './DishDetails.vue'
import DishCard from './cards/DishCard.vue'
import { Dish } from '@/types'
import { Dish as DishClass } from '@/classes'

export default defineComponent({
  components: {
    DishCard,
    DishDetails
  },
  setup() {
    const dishes = computed(() => store.state.dishes)
    let dishDetailsIsOpen = ref(false)
    let currentDishDetails = ref(new DishClass())
    const categoryFilter = computed(() => store.state.categoryFilter)
    const categories = computed(() => 
      store.state.categories.filter(c => store.state.dishes.find(d => d.category == c.name)))
    let keyword = ref('')
    let lang = ref('')

    const setCategory = (selectedCategory: string | null) =>
      store.commit('setCategoryFilter', selectedCategory)

    const filteredDishes = computed(() => lang.value === 'en' ?
      dishes.value.filter(({name}) => 
        name.toLowerCase().includes(keyword.value.toLowerCase())) : dishes.value.filter(({name_NL}) => 
        name_NL.toLowerCase().includes(keyword.value.toLowerCase())))

    const checkIfDishCanBeMade = (dish: Dish) =>
      dish.ingredients.some((x) => 
        store.state.ingredients.filter(d => d.isInStock && x == d.name))

    const manageStickyNav = (navbar: HTMLElement | null) => {
      if(!!navbar) {
        window.pageYOffset >= navbar.offsetTop ? 
          navbar.classList.add('sticky') : navbar.classList.remove('sticky')
      }
    }
  
    const toggleDishDetails = (dish: Dish) => {
      dishDetailsIsOpen.value = !dishDetailsIsOpen.value
      currentDishDetails.value = dish
    }

    onMounted(() => {
      lang.value = localStorage.getItem('lang') || 'en'
      window.addEventListener('scroll', () => 
        manageStickyNav(document.getElementById('navbar')))
    })

    return {
      categories,
      dishes,
      filteredDishes,
      keyword,
      lang,
      dishDetailsIsOpen,
      currentDishDetails,
      checkIfDishCanBeMade,
      categoryFilter,
      setCategory,
      toggleDishDetails
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