<template>
  <div>
    <div class="mb-5">
      <h1>Menu</h1>
      <h2>Categories</h2>
      <form @submit.prevent="createCategory">
        <input v-model="name">
        <button class="btn btn-primary rounded">New category</button>
      </form>
      <ul>
        <Category v-for="category of categories" :key="category.id" :category="category" />
      </ul>
      <h2>Dishes</h2>
      <button class="btn btn-primary rounded" @click="toggleDialog">New dish</button>
      <ul>
        <Dish v-for="dish of dishes" :key="dish.id" :dish="dish" />
      </ul>
    </div>
    <Dialog v-show="isOpen" :key="isOpen" />
  </div>
</template>

<script lang="ts">
import Category from '../components/Category.vue'
import Dish from '../components/Dish.vue'
import Dialog from '../components/Dialog.vue'
import store from '@/store'
import { computed, ref } from 'vue'

export default {
  name: 'Menu',
  components: {
    Category,
    Dish,
    Dialog
  },
  setup () {  
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)
    const isOpen = computed(() => store.state.isOpen)
    const toggleDialog = () => { 
      store.dispatch('toggleDialog', false) 
      store.dispatch('setCurrentDish', {})
    }

    let name = ref('')
    const createCategory = () => {
      store.dispatch('createNewCategory', {id: 0, name: name.value})
      store.dispatch('getAllCategories')
    }
    return { categories, dishes, isOpen, toggleDialog, name, createCategory }
  }
}
</script>

<style>
@font-face {
  font-family: SF Pro Display;
  src: url("../fonts/SFPRODISPLAYREGULAR.OTF");
}

.food-card {
  position: relative;
  width: 350px;
  height: 100px;
}

.menu-card {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: #FFFFFF;
  box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
}

.menu-title {
  position: absolute;
  left: 32%;
  right: 15.14%;
  top: 9%;
  bottom: 71%;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;

  color: #000000;
}

.menu-image {
  position: absolute;
  left: 1.43%;
  right: 72.86%;
  top: 5%;
  bottom: 5%;
  background-size: cover!important;
  mix-blend-mode: normal;
  border-radius: 22px;
}

.description-frame{
  position: absolute;
  left: 32%;
  right: 18%;
  top: 33%;
  bottom: 5%;
}

.menu-description {
  position: absolute;
  width: 175px;
  height: 48px;
  left: 0px;
  top: 0px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;

  color: #9F9F9F;
}

.plus-icon {
  position: absolute;
  left: 85.71%;
  right: 4.29%;
  top: 31%;
  bottom: 34%;

  background: url(../assets/plus_icon.png);
}

li {
  list-style: none;
}

ul {
  margin:0;
  padding:0;
}
</style>
