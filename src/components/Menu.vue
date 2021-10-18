<template>
  <!-- Load categories 1 by 1 -->
  <div class="menu">
      <div id="navbar">
        <a v-for="category in categories" :key="category.id" :href="`#${category.name}`">{{category.name}}</a>
      </div>
    <div class="menu-content">
      <div v-for="category in categories" :key="category.id">
        <h2>{{category.name}}</h2>
        <a :id="category.name" class="anchor"></a>
        <div v-for="dish in dishes" :key="dish.id">
          <Dish v-if="dish.category==category.name" :dish="dish" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue'
import store from '@/store'

import Category from '../components/Category.vue'
import Dish from '../components/Dish.vue'

export default {
  name: 'Menu',
  components: {
    Category,
    Dish,
  },
  setup() {
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)

    onMounted(() =>{
      let navbar = document.getElementById('navbar')
      window.addEventListener('scroll', () => manageStickyNav(navbar))
    })

    return {
      categories,
      dishes
    }
  }
}

const manageStickyNav = (navbar: HTMLElement | null) => {
  if(navbar != null) {
    console.log(window.pageYOffset, navbar.offsetTop)
    window.pageYOffset >= navbar.offsetTop ? 
      navbar.classList.add('sticky') : navbar.classList.remove('sticky')
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
  margin-left: -15px;
  width: 110%;
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

a.anchor{display: block; position: relative; top: -150px; visibility: hidden;}

</style>
