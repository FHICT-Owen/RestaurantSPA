<template>
	<div>
    <div class="justify-center w-full lg:w-3/5">
      <h1 class="text-5xl p-1">Menu</h1>
      <h2 class="text-4xl p-1">Categories</h2>
      <div class="border-2 rounded-lg p-2">
        <button class="bg-gray-200 rounded-lg p-1" @click="createCategory">New category</button>
        <input class="border-2 rounded-lg p-1 mx-2" v-model="category" placeholder="Enter english category name ...">
        <input class="border-2 rounded-lg p-1 mx-2" v-model="categoryNL" placeholder="Enter dutch category name ...">
        <Category v-for="category of categories" :key="category.id" :category="category" />
      </div>
      <h2 class="text-4xl p-1">Ingredients</h2>
      <div class="border-2 rounded-lg p-2">
        <button class="bg-gray-200 rounded-lg p-1" @click="createIngredient">New ingredient</button>
        <input class="border-2 rounded-lg p-1 mx-2" v-model="ingredient" placeholder="Enter english ingredient name ...">
        <input class="border-2 rounded-lg p-1 mx-2" v-model="ingredientNL" placeholder="Enter dutch ingredient name ...">
        <input type="checkbox" @change="setIsAllergen">
        <IngredientCard v-for="ingredient of ingredients" :key="ingredient.id" :ingredient="ingredient" />
      </div>
      <h2 class="text-4xl p-1">Dishes</h2>
      <div class="border-2 rounded-lg p-2">
        <button class="bg-gray-200 rounded-lg p-2" @click="toggleDialog">New dish</button>
        <div class="flex flex-col" v-for="dish of dishes" :key="dish.id"> 
          <Dish class="w-full" :dish="dish" />
          <div class="flex flex-row justify-end rounded-lg mt-1.5 h-10">
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
import Category from './cards/CategoryCard.vue'
import Dish from './cards/DishCard.vue'
import Dialog from './dialogs/Dialog.vue'
import store from '@/store'
import { computed, defineComponent, ref } from 'vue'
import DeleteConfirmDialog from './dialogs/DeleteConfirmDialog.vue'
import DeleteButton from './buttons/DeleteButton.vue'
import EditButton from './buttons/EditButton.vue'
import IngredientCard from './cards/IngredientCard.vue'

export default defineComponent({
  components: {
    Category,
    Dish,
    Dialog,
    DeleteConfirmDialog,
    DeleteButton,
    EditButton,
    IngredientCard 
  },
  setup () {
    const categories = computed(() => store.state.categories)
    const dishes = computed(() => store.state.dishes)
    const ingredients = computed(() => store.state.ingredients)
    const isConfirmDialogOpen = computed(() => store.state.isConfirmDialogOpen)
    const isDishDialogOpen = computed(() => store.state.isDishDialogOpen)
    let isAllergen = ref(false)

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

    let category = ref('')
    let categoryNL = ref('')
    const createCategory = () => {
      store.dispatch('createNewCategory', {id: 0, name: category.value, name_NL: categoryNL.value})
      category.value = ''
      categoryNL.value = ''
    }

    let ingredient = ref('')
    let ingredientNL = ref('')
    const createIngredient = () => {
      store.dispatch('createNewIngredient', {id: 0, name: ingredient.value, name_NL: ingredientNL.value, isAllergen: isAllergen.value})
      ingredient.value = ''
      ingredientNL.value = ''
    }

    const setIsAllergen = (e: any) => {
      isAllergen.value = e.target.checked
    }

    return {
      categories, 
      dishes, 
      isDishDialogOpen, 
      isConfirmDialogOpen, 
      toggleDialog, 
      category, 
      categoryNL, 
      createCategory, 
      openEditDialog, 
      openConfirmDialog,
      ingredients,
      ingredient,
      ingredientNL,
      createIngredient,
      setIsAllergen
    }
  }
})
</script>
