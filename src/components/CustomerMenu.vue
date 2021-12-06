<template>
  <div>
    <div id="navbar" class="flex flex-col bg-white overflow-hidden z-50">
      <input v-model="keyword" class="justify-center shadow-sm rounded-3xl h-10 p-3 mt-1" placeholder="Search for your dish..." />
      <div class="flex flex-row overflow-x-scroll">
        <div 
          id="all" 
          @click="selectCategory"
          class="no-underline capitalize py-2 px-4 mx-2 my-2.5 cursor-pointer select-none whitespace-nowrap">
          All
        </div>
        <div
          v-for="category in categories"
          :id="category.name"
          :key="category.id"
          @click="selectCategory"
          :tabindex="category.id"
          class="no-underline capitalize py-2 px-4 mx-2 my-2.5 cursor-pointer select-none whitespace-nowrap"
          >
          <div v-if="lang == 'en' ">{{ category.name }}</div>
          <div v-else-if="lang == 'nl'">{{ category.name_NL }}</div>
        </div>
      </div>
    </div>
    <div class="capitalize container">
      <div v-for="category in selectedCategory" :key="category.id">
        <h2 class="text-3xl mt-5">{{ category }}</h2>
        <div v-for="(dish, index) in filteredDishes" :key="index">
          <Dish v-if="dish.category == category" :dish="dish" />
        </div>
      </div>
      <div class="h-28"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import store from '@/store'
import Dish from '../components/Dish.vue'

export default defineComponent({
  components: {
    Dish
  },
  setup() {
    const categories = computed(() => 
      store.state.categories.filter(c => store.state.dishes.find(d => d.category == c.name))
    )
    const dishes = computed(() => store.state.dishes)
    let keyword = ref('')

    const filteredDishes = computed(() => 
      dishes.value.filter(({ name }) => 
        name.toLowerCase().includes(keyword.value.toLowerCase())))

    const selectedCategory = computed(() => store.state.selectedCategory)
    
    const selectCategory = (e:any) => {
      const newElement = document.getElementById(e.target.textContent)
      const lastElement = document.getElementById(store.state.selectedCategory[0])
      const all = document.getElementById('all')
      if (!!all) {
        all.classList.remove('select')
      }
      if (!!newElement && !!lastElement) {
        lastElement.classList.remove('select')
        newElement.classList.add('select')
      }
      store.commit('setSelectedCategory', e.target.textContent)
    }
    
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
      const all = document.getElementById('all')
      if (!!all) all.classList.add('select')
    })

    return {
      categories,
      dishes,
      selectCategory,
      filteredDishes,
      keyword,
      selectedCategory,
      lang
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