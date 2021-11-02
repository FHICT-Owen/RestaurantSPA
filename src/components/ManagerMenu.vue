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
    <Dialog v-if="isDishDialogOpen" :key="isDishDialogOpen" />
    <DeleteConfirmationDialog v-if="isCategoryDialogOpen" :props=""/>
  </div>
</template>


<script lang="ts">
import Category from '../components/Category.vue'
import Dish from '../components/Dish.vue'
import Dialog from '../components/Dialog.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import store from '@/store'
import { computed, ref } from 'vue'

export default {
  name: 'ManagerMenu',
  components: {
    Category,
    Dish,
    Dialog,
    DeleteConfirmationDialog,
  },
  setup () {  
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)
    const isDishDialogOpen = computed(() => store.state.isDishDialogOpen)
    const isCategoryDialogOpen = computed(() => store.state.isCategoryDialogOpen)
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
    return { categories, dishes, isDishDialogOpen, isCategoryDialogOpen, toggleDialog, name, createCategory }
  }
}
</script>
