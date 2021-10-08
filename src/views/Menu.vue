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
