<template>
	<div>
    <div class="justify-center w-full lg:w-3/5">
      <h1 class="text-5xl p-1">Menu</h1>
      <h2 class="text-4xl p-1">Categories</h2>
      <div class="border-2 rounded-3xl p-2">
        <form @submit.prevent="createCategory" class="flex justify-center">
          <button class="bg-gray-200 rounded-xl p-2">New category</button>
          <input class="border-2 rounded-3xl p-1 mx-2" v-model="name">
        </form>
        <Category v-for="category of categories" :key="category.id" :category="category" />
      </div>
      <h2 class="text-4xl p-1">Dishes</h2>
      <div class="border-2 rounded-3xl p-2">
        <button class="bg-gray-200 rounded-xl p-2" @click="toggleDialog">New dish</button>
        <div class="flex flex-col" v-for="dish of dishes" :key="dish.id"> 
          <Dish class="w-full" :dish="dish" />
          <div class="flex flex-row justify-end rounded-3xl mt-1.5 h-10">
            <EditButton @click="openEditDialog(dish)" class="w-full md:w-1/4 my-1 ml-1 mr-0.5" />
            <DeleteButton @click="openConfirmDialog(dish)" class="w-full md:w-1/4 my-1 ml-0.5 mr-1" />
          </div>
        </div>
      </div>
    </div>
    <DeleteConfirmDialog v-if="isConfirmDialogOpen" :key="isConfirmDialogOpen" />
    <Dialog v-if="isDishDialogOpen" :key="isDishDialogOpen" />
  </div>
</template>


<script lang="ts">
import Category from './cards/Category.vue'
import Dish from './cards/Dish.vue'
import Dialog from './dialogs/Dialog.vue'
import store from '@/store'
import { computed, ref } from 'vue'
import DeleteConfirmDialog from './dialogs/DeleteConfirmDialog.vue'
import DeleteButton from './buttons/DeleteButton.vue'
import EditButton from './buttons/EditButton.vue'

export default {
  name: 'ManagerMenu',
  components: {
    Category,
    Dish,
    Dialog,
    DeleteConfirmDialog,
    DeleteButton,
    EditButton
  },
  setup () {  
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)
    const isConfirmDialogOpen = computed(() => store.state.isConfirmDialogOpen)
    const isDishDialogOpen = computed(() => store.state.isDishDialogOpen)
    const toggleDialog = () => { 
      store.dispatch('toggleDialog', false) 
      store.dispatch('setCurrentDish', {})
    }

    const openEditDialog = (dish: Dish) => {
      store.dispatch('toggleDialog', true)
      store.dispatch('setCurrentDish', dish)
    }

    const openConfirmDialog = (dish: Dish) => {
      store.dispatch('openConfirmDialog', {object: dish, function: () => store.dispatch('deleteDish', dish)})
    }

    let name = ref('')
    const createCategory = () => {
      store.dispatch('createNewCategory', {id: 0, name: name.value})
      name.value = ''
    }
    return { 
      categories, 
      dishes, 
      isDishDialogOpen, 
      isConfirmDialogOpen, 
      toggleDialog, 
      name, 
      createCategory, 
      openEditDialog, 
      openConfirmDialog 
    }
  }
}
</script>
