<template>
  <div>
    <div v-show="nav_fixedheight" style="height: 52px"></div>
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
            <input v-model="keyword" class="searchNav" placeholder="Search for your favorite dish..." />
          </div>
        </div>
      </div>
    </div>

    <div class="menu-content container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-sm-12 col-md-8">
          <!-- TODO:Filter on search -->
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
import DishFilter from '../components/DishFilter.vue'

const categories = computed(() => store.state.categories)
const dishes = computed(() => store.state.dishes)

export default {
  name: 'CostumerMenu',
  components: {
    Dish,
  },
  data() {
    return { keyword: '', dishes }
  },
  computed: {
    filterDishes() {
      const keyword = (this as any).keyword
      return dishes.value.filter(({ name }) => name.toLowerCase().includes(keyword.toLowerCase()))
    },
  },
  setup() {
    let nav_fixedheight = ref(false)

    onMounted(() => {
      var navbar = document.getElementById('navbar')
      if (!!navbar) var sticky = navbar.offsetTop
      window.addEventListener('scroll', () => manageStickyNav(navbar, sticky))
    })

    function manageStickyNav(navbar: any, sticky: any) {
      if (!!navbar) {
        if (window.pageYOffset >= sticky) {
          nav_fixedheight.value = true
          navbar.classList.add('sticky')
        } else {
          nav_fixedheight.value = false
          navbar.classList.remove('sticky')
        }
      }
    }
    return {
      categories,
      nav_fixedheight,
    }
  },
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

/* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
.sticky + .content {
  padding-top: 60px;
}

a.anchor {
  display: block;
  position: relative;
  top: -150px;
  visibility: hidden;
}
</style>