<template>
	<div>
    <div class="justify-center w-1/2">
      <h1 class="text-5xl p-1">Menu</h1>
      <h2 class="text-4xl p-1">Categories</h2>
      <div class="border-2 border-gray-600 rounded-3xl p-2">
        <form @submit.prevent="createCategory" class="flex justify-center">
          <button class="bg-gray-200 rounded-xl p-2">New category</button>
          <input class="border-2 border-gray-500 rounded-3xl p-1 mx-2" v-model="name">
        </form>
        <Category v-for="category of categories" :key="category.id" :category="category" />
      </div>
      <h2 class="text-4xl p-1">Dishes</h2>
      <div class="border-2 border-gray-600 rounded-3xl p-2">
        <button class="bg-gray-200 rounded-xl p-2" @click="toggleDialog">New dish</button>
        <Dish v-for="dish of dishes" :key="dish.id" :dish="dish" />
      </div>
    </div>
    <Dialog v-if="isDishDialogOpen" :key="isDishDialogOpen" />
  </div>
</template>


<script lang="ts">
import Category from '../components/Category.vue'
import Dish from '../components/Dish.vue'
import Dialog from '../components/Dialog.vue'
import store from '@/store'
import { computed, ref } from 'vue'

export default {
  name: 'ManagerMenu',
  components: {
    Category,
    Dish,
    Dialog
  },
  setup () {  
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)
    const isDishDialogOpen = computed(() => store.state.isDishDialogOpen)
    const toggleDialog = () => { 
      store.dispatch('toggleDialog', false) 
      store.dispatch('setCurrentDish', {})
    }

    let name = ref('')
    const createCategory = () => {
      store.dispatch('createNewCategory', {id: 0, name: name.value}).then(() => {
        store.dispatch('getAllCategories')
      })
      name.value = ''
    }
    return { categories, dishes, isDishDialogOpen, toggleDialog, name, createCategory }
  }
}
</script>
