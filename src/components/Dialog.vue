<template>
  <DialogBackground @click="closeDialog">
    <dialog class="flex shadow-lg bg-white rounded-3xl flex-col p-2 z-40 top-1/2" style="transform: translateY(-50%)">
      <div class="w-80 h-80 flex flex-row justify-end rounded-3xl bg-gray-100" :style="{background: image}">
        <label 
          class="text-yellow-400 rounded-3xl p-2 border-2 border-yellow-400 mb-1 mr-1 bg-white y-6 self-end text-center cursor-pointer" 
          for="FileUpload">
            Choose Image...
        </label>
        <input
          type="file"
          id="FileUpload"
          style="display: none"
          @change="handleFileChange($event)">
      </div>
      <div class="flex flex-row justify-center pt-2">
        <button class="flex hover:bg-gray-100 text-center border-yellow-400 text-yellow-400 p-2 border-2 border-solid box-border rounded-l-3xl" @click="onGeneralTab = true">General</button>
        <button class="flex hover:bg-gray-100 text-center border-yellow-400 text-yellow-400 p-2 border-2 border-solid box-border rounded-r-3xl" @click="onGeneralTab = false">Ingredients</button>
      </div>
      <div v-if="onGeneralTab" class="flex flex-row pt-2 justify-evenly">
        <div class="flex flex-col">
          <input placeholder="Enter dish name ..." v-model="name" />
          <textarea class="resize-none w-48 h-24 mt-2" placeholder="Enter dish description ..." v-model="description" />
        </div>
        <div class="flex flex-col">
          <select 
            class="text-black italic rounded-3xl p-2 mb-1 mr-1 bg-white y-6 self-end text-center cursor-pointer"
            v-model="category">
            <option v-for="category of categories" :key="category.id">
              {{ category.name }}
            </option>
          </select>
          <select 
            class="text-black rounded-3xl p-2 mb-1 mr-1 bg-white y-6 self-end text-center cursor-pointer" 
            v-model="category">
            <option v-for="category of categories" :key="category.id">
              {{ category.name }}
            </option>
          </select>
          <input class="w-16" placeholder="Prize ..."/>
        </div>
      </div>
      <div v-else class="flex flex-row pt-2 max-w-xs">
        <ul class="flex flex-wrap list-unstyled flex-row">
          <Ingredient v-for="ingredient of dishIngredients" :key="ingredient.id" :ingredient="ingredient" />
          <button v-if="!settingIngredient" class="bg-gray-200 rounded-full px-2" @click="settingIngredient = true">+</button>
          <div v-else>
            <form @submit.prevent="addIngredient">
              <input v-model="ingredient" list="list" />
              <datalist id="list">
                <option v-for="ingredient of ingredients" :key="ingredient.id">{{ingredient.name}}</option>
              </datalist>
            </form>
          </div>
        </ul>
      </div>
      <div class="flex flex-row justify-end mt-2">
        <button v-if="isEdit" 
          class="text-white rounded-3xl px-3 py-1 mr-1 bg-red-500 hover:bg-red-600" 
          @click="deleteDish">
            Delete
        </button>
        <button
          class="text-yellow-400 rounded-3xl px-3 py-1 border-2 border-yellow-400 hover:bg-gray-100" 
          @click="saveDish">
            Save
        </button>
      </div>
    </dialog>
  </DialogBackground>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import store from '@/store'
import { toBase64URL } from '@/utils'
import Ingredient from './Ingredient.vue'
import DialogBackground from './DialogBackground.vue'

export default {
  components: {
    Ingredient,
    DialogBackground
  },
  setup() {
    const isEdit = computed(() => store.state.isEditDialog)
    const categories = computed(() => store.state.categories)
    const ingredients = computed(() => store.state.ingredients)

    let name = ref(isEdit ? store.state.currentDish.name : '')
    let description = ref(isEdit ? store.state.currentDish.description : '')
    let category = ref(isEdit ? store.state.currentDish.category : '')
    let dishIngredients = ref<string[]>(isEdit ? store.state.currentDish.ingredients || [] : [])
    let image = ref(isEdit ? store.state.currentDish.image : '')

    let onGeneralTab = ref(true)
    let settingIngredient = ref(false)
    let ingredient = ref('')
    
    const saveDish = () => {
      store.dispatch(isEdit.value ? 'editDish' : 'createNewDish', {
        id: isEdit.value ? store.state.currentDish.id : 0,
        name: name.value,
        description: description.value,
        category: category.value,
        ingredients: dishIngredients.value,
        image: image.value
      }).then(() => 
        store.dispatch('getAllDishes'))
    }

    const deleteDish = () => {
      store.dispatch('deleteDish', {
        id: store.state.currentDish.id,
        name: name.value,
        description: description.value,
        category: category.value,
        ingredients: dishIngredients.value,
        image: image.value
      }).then(() => 
        store.dispatch('getAllDishes'))
    }

    const closeDialog = () => store.state.isDishDialogOpen = false

    const handleFileChange = async (e: any) =>
      await toBase64URL(e.target.files[0]).then(
        data => image.value = data as string
      )

    const addIngredient = () => {
      settingIngredient.value = false
      if (store.state.ingredients.filter(obj => obj.name === ingredient.value).length === 0)
        
        if (!dishIngredients.value.includes( ingredient.value)) {
          dishIngredients.value.push(ingredient.value)}
    }

    return {
      isEdit,
      categories,
      ingredients,

      name,
      description,
      category,
      dishIngredients,
      image,

      onGeneralTab,
      settingIngredient,
      ingredient,

      saveDish,
      deleteDish,

      closeDialog,
      handleFileChange,
      addIngredient
    }
  }
}
</script>
