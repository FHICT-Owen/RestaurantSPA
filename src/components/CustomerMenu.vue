<template>
  <div>
    <div id="navbar">
      <div class="container">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <a
              v-for="category in categories"
              :key="category.id"
              :href="`#${category.name}`"
              >{{ category.name }}</a
            >
          </div>
            <div class="col-md-2">
              <input v-model="keyword" class="searchNav" placeholder="Search for your dish..." />
            </div>
        </div>
      </div>
    </div>

    <div class="menu-content container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-sm-12 col-md-8">
          <div v-for="category in categories" :key="category.id">
            <h2 class="display-4">{{ category.name }}</h2>
            <a :id="category.name" class="anchor"></a>
            <div v-for="(dish, index) in filterDishes" :key="index">
              <Dish v-if="dish.category == category.name" :dish="dish" />
            </div>
          </div>
        </div>
        <div class="col-md-2"></div>
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
html {
  scroll-behavior: smooth;
}

.menu {
  /* background: #FFA825; */
  border-bottom-left-radius: 42px;
  border-bottom-right-radius: 42px;
}

.searchNav {
  padding: 14px;
}

.menu-content {
  border-radius: 42px;
  background-color: white;
}

.menu-content h2 {
  text-transform: capitalize;
  margin-top: 20px;
}

/* Style the navbar */
#navbar {
  overflow: hidden;
  background-color: #efefef;
  width: 100%;
  z-index: 999;
}

/* Navbar links */
#navbar a {
  text-transform: capitalize;
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

/* Page content */
.content {
  padding: 16px;
}

/* The sticky class is added to the navbar with JS when it reaches its scroll position */
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

a.anchor {
  display: block;
  position: relative;
  top: -150px;
  visibility: hidden;
}
</style>