<template>
  <div>
    <div id="navbar" class="flex flex-col bg-gray-200 w-full overflow-hidden z-50">
      <input v-model="keyword" class="justify-center shadow-sm rounded-3xl h-10 p-3" placeholder="Search for your dish..." />
      <div class="flex flex-row justify-between">
        <div
          v-for="category in filteredCategories"
          :id="category.name"
          :key="category.id"
          @click="selectCategory"
          class="no-underline capitalize p-4 cursor-pointer select-none"
          >{{ category.name }}
        </div>
      </div>
    </div>
    <div class="capitalize container">
      <div>
        <div v-for="category in categories" :key="category.id">
          <h2 class="text-5xl mt-5">{{ category.name }}</h2>
          <a :id="category.name" class="anchor"></a>
          <div v-for="(dish, index) in filteredDishes" :key="index">
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

    const filteredDishes = computed(() => 
      dishes.value.filter(({ name }) => 
        name.toLowerCase().includes(keyword.value.toLowerCase())))

    const filteredCategories = computed(() => store.state.selectedCategories.length == 0 ? categories.value : 
      categories.value.map(category => {if(store.state.selectedCategories.includes(category.name)) return category }
      ))
    
    const selectCategory = (e:any) => {
      const element = document.getElementById(e.target.textContent)
      if(!!element) {
        if(!store.state.selectedCategories.includes(e.target.textContent)) {
          store.state.selectedCategories.push(e.target.textContent)
          element.classList.add('select')
        }
        else {
          store.state.selectedCategories.splice(store.state.selectedCategories.indexOf(e.target.textContent), 1)
          element.classList.remove('select')
        }
      }      
      //else selectedCategories.value = categories.value
    }

    const manageStickyNav = (navbar: HTMLElement | null) => {
      if(!!navbar) {
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
      filteredDishes,
      keyword,
      selectCategory,
      filteredCategories
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
.select {
  background-color: red;
}
</style>