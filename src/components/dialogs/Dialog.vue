<template>
  <DialogBackground :close="closeDialog">
    <dialog 
      class="flex rounded-3xl p-2 z-50 top-1/2" 
      style="transform: translateY(-50%); box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);">
      <div class="flex flex-col w-80">
        <div 
          class="w-80 h-80 flex flex-row justify-end rounded-3xl bg-gray-100 bg-blend-normal bg-cover bg-no-repeat" 
          :style="{background: image}">
          <label 
            class="text-yellow-400 rounded-3xl h-8 w-28 text-center text-sm border-2 border-yellow-400 mb-1 mr-1 bg-white y-6 self-end cursor-pointer" 
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
          <button 
            id="general"
            class="w-36 text-sm h-8 selected border-yellow-400 border-2 border-solid box-border rounded-l-3xl" 
            @click="switchGeneral">General</button>
          <button 
            id="ingredients"
            class="w-36 h-8 text-sm unselected border-yellow-400 border-2 border-solid box-border rounded-r-3xl" 
            @click="switchGeneral">Ingredients</button>
        </div>
        <div v-if="onGeneralTab" class="flex flex-row pt-2 justify-evenly">
          <div class="flex flex-col w-40">
            <div class="flex flex-row m-0.5">
              <button 
                id="EN"
                class="rounded text-sm px-2 selected border-yellow-400 border-2 border-solid box-border mr-1"
                @click="switchLanguage">EN</button>
              <button 
                id="NL"
                class="rounded text-sm px-2 unselected border-yellow-400 border-2 border-solid box-border"
                @click="switchLanguage">NL</button>
            </div>
            <input 
              v-if="onEnglish" 
              class="text-base" 
              placeholder="Enter english dish name ..." 
              v-model="name" />
            <input 
              v-else 
              class="text-base" 
              placeholder="Enter dutch dish name ..." 
              v-model="nameNL" />
            <textarea 
              v-if="onEnglish" 
              class="text-sm resize-none h-24 mt-2" 
              placeholder="Enter english dish description ..." 
              v-model="description" />
            <textarea 
              v-else 
              class="text-sm resize-none h-24 mt-2" 
              placeholder="Enter dutch dish description ..." 
              v-model="descriptionNL" />
          </div>
          <div class="flex flex-col">
            <select 
              class="text-black italic rounded-3xl p-2 mb-1 mr-1 bg-white y-6 self-end text-center cursor-pointer"
              v-model="category">
              <option v-for="category of categories" :key="category.id">
                {{ category.name }}
              </option>
            </select>
            <input type="number" min="0" step="0.01" v-model="prize" class="w-24 self-end" placeholder="Prize ..."/>
          </div>
        </div>
        <div v-else class="flex flex-row pt-2 max-w-xs">
          <ul class="flex flex-wrap list-unstyled flex-row">
            <Ingredient v-for="ingredient of dishIngredients" :key="ingredient.id" :ingredient="ingredient" />
            <PlusSmIcon v-if="!settingIngredient" class="rounded-full w-7 h-7 m-1.5 hover:opacity-60 p-1 cursor-pointer" style="box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);" @click="settingIngredient = true"/>
            <div v-else>
              <select 
                @change="addNewIngredient"
                class="text-black italic rounded-3xl p-2 mb-1 mr-1 bg-white y-6 self-end text-center cursor-pointer"
                v-model="ingredient">
                <option v-for="ingredient of ingredients" :key="ingredient.id">
                  {{ingredient.name}}
                </option>
              </select>
            </div>
          </ul>
        </div>
        <div class="flex flex-row justify-end mt-2">
          <button
            class="text-yellow-400 rounded-3xl px-3 py-1 border-2 border-yellow-400 hover:bg-gray-100" 
            @click="saveDish">
              Save
          </button>
        </div>
      </div>
    </dialog>
  </DialogBackground>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import store from '@/store'
import { toBase64URL } from '@/utils'
import Ingredient from '../cards/DishIngredientCard.vue'
import DialogBackground from './DialogBackground.vue'
import { PlusSmIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    Ingredient,
    DialogBackground,
    PlusSmIcon
  },
  setup() {
    const isEdit = computed(() => store.state.isEditDialog)
    const categories = computed(() => store.state.categories)
    const ingredients = computed(() => store.state.ingredients)

    let name = ref(isEdit ? store.state.currentDish.name : '')
    let nameNL = ref(isEdit ? store.state.currentDish.name_NL : '')
    let description = ref(isEdit ? store.state.currentDish.description : '')
    let descriptionNL = ref(isEdit ? store.state.currentDish.description_NL : '')
    let category = ref(isEdit ? store.state.currentDish.category : '')
    let dietaryRestrictions = ref<string[]>([])
    let dishIngredients = ref<string[]>(isEdit ? store.state.currentDish.ingredients || [] : [])
    let prize = ref(isEdit ? (Math.round(store.state.currentDish.prize * 100) / 100).toFixed(2) : 0)
    let image = ref(isEdit ? store.state.currentDish.image : '')

    let options = ref(['Vegan', 'Vegetarian'])

    let onEnglish = ref(true)

    let onGeneralTab = ref(true)
    let settingIngredient = ref(false)
    let ingredient = ref('')

    const switchGeneral = (e:any) => {
      switch (e.target.id) {
      case 'general':
        onGeneralTab.value = true
        e.target.classList.remove('unselected')
        e.target.classList.add('selected')
        const ingredients = document.getElementById('ingredients')
        if (!!ingredients) {
          ingredients.classList.remove('selected')
          ingredients.classList.add('unselected')
        } 
        break
      case 'ingredients':
        onGeneralTab.value = false
        e.target.classList.remove('unselected')
        e.target.classList.add('selected')
        const general = document.getElementById('general')
        if (!!general) {
          general.classList.remove('selected')
          general.classList.add('unselected')
        } 
        break
      }
    }

    const switchLanguage = (e:any) => {
      switch (e.target.id) {
      case 'EN':
        onEnglish.value = true
        e.target.classList.remove('unselected')
        e.target.classList.add('selected')
        const ingredients = document.getElementById('NL')
        if (!!ingredients) {
          ingredients.classList.remove('selected')
          ingredients.classList.add('unselected')
        } 
        break
      case 'NL':
        onEnglish.value = false
        e.target.classList.remove('unselected')
        e.target.classList.add('selected')
        const general = document.getElementById('EN')
        if (!!general) {
          general.classList.remove('selected')
          general.classList.add('unselected')
        } 
        break
      }
    }

    const saveDish = () => {
      store.dispatch(isEdit.value ? 'editDish' : 'createNewDish', {
        id: isEdit.value ? store.state.currentDish.id : 0,
        name: name.value,
        name_NL: nameNL.value,
        description: description.value,
        description_NL: descriptionNL.value,
        category: category.value,
        dietaryRestrictions: [],
        ingredients: dishIngredients.value,
        prize: prize.value,
        image: image.value
      })
      store.commit('closeDishDialog')
    }
      
    const addNewIngredient = (e:any) => {
      if(!dishIngredients.value.includes(e.target.selectedOptions[0].text))
        dishIngredients.value.push(e.target.selectedOptions[0].text)
      ingredient.value = ''
      settingIngredient.value = false
    }

    const closeDialog = () => store.state.isDishDialogOpen = false

    const handleFileChange = async (e: any) =>
      await toBase64URL(e.target.files[0]).then(
        data => image.value = data as string
      )

    return {
      isEdit,
      categories,
      ingredients,

      name,
      nameNL,
      description,
      descriptionNL,
      category,
      dietaryRestrictions,
      dishIngredients,
      prize,
      image,

      onGeneralTab,
      settingIngredient,
      ingredient,

      saveDish,

      closeDialog,
      handleFileChange,

      switchGeneral,
      addNewIngredient,

      switchLanguage,
      onEnglish,

      options
    }
  }
})
</script>

<style scoped>
  .selected {
    background-color: rgba(251, 191, 36);
    color: white;
  }
  .unselected {
    background-color: white;
    color: rgba(251, 191, 36);
  }
</style>