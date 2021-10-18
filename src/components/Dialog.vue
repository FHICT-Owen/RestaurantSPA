<template>
  <div class="top-1/4 left-1/2 fixed">
    <dialog class="shadow-lg rounded-3xl flex-col w-96" open>
      <div class="w-56 h-56 flex justify-end rounded-3xl bg-gray-100" :style="{background: selectedImage}">
        <label 
          class="text-yellow-400 rounded-3xl p-2 border-2 border-yellow-400 mb-1 mr-1 bg-white y-6 self-end text-center" 
          style="cursor: pointer" 
          for="FileUpload">
            Choose Image...
        </label>
        <input
          type="file"
          id="FileUpload"
          style="display: none"
          @change="handleFileChange($event)">
      </div>
      <input v-model="name" />
      <textarea class="resize-none" v-model="description" />
      <select 
        class="text-yellow-400 rounded-3xl p-2 border-2 border-yellow-400 mb-1 mr-1 bg-white y-6 self-end text-center" 
        style="cursor: pointer" 
        v-model="category">
        <option v-for="category of categories" :key="category.id">
          {{ category.name }}
        </option>
      </select>
      <button 
        class="text-white rounded-3xl p-2 bg-red-500 hover:bg-red-600" 
        @click="deleteDish">
          Delete
      </button>
      <button v-if="isEdit" 
        class="text-yellow-400 rounded-3xl p-2 border-2 border-yellow-400 hover:bg-gray-200" 
        @click="editDish">
          Save
      </button>
      <button v-else 
        class="text-yellow-400 rounded-3xl p-2 border-2 border-yellow-400 hover:bg-gray-200" 
        @click="createDish">
          Save
      </button>
    </dialog>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import store from '@/store'
import { toBase64URL } from '@/utils'

export default {
  setup() {
    let name = ref('')
    let description = ref('')
    let image = ref('')
    let selectedImage = ref('')
    let category = ref('')
    const categories = computed(() => store.state.categories)
    const isEdit = computed(() => store.state.isEditDialog)

    if (isEdit) {
      name.value = store.state.currentDish.name
      description.value = store.state.currentDish.description
      image.value = store.state.currentDish.image
      selectedImage.value = store.state.currentDish.image
      category.value = store.state.currentDish.category
    } else {
      name.value = ''
      description.value = ''
      image.value = ''
      category.value = ''
    }

    const createDish = () => {
      store
        .dispatch('createNewDish', {
          id: 0,
          name: name.value,
          description: description.value,
          image: image.value,
          category: category.value,
        })
        .then(() => {
          store.dispatch('getAllDishes')
        })
    }

    function editDish() {
      store
        .dispatch('editDish', {
          id: store.state.currentDish.id,
          name: name.value,
          description: description.value,
          image: image.value,
          category: category.value,
        })
        .then(() => {
          store.dispatch('getAllDishes')
        })
    }

    function deleteDish() {
      store
        .dispatch('deleteDish', {
          id: store.state.currentDish.id,
          name: name.value,
          description: description.value,
          image: image.value,
          category: category.value,
        })
        .then(() => {
          store.dispatch('getAllDishes')
        })
    }

    const handleFileChange = async (e: any) => {
      await toBase64URL(e.target.files[0]).then(data => image.value = data as string)
      selectedImage.value = `url("${URL.createObjectURL(e.target.files[0])}")`
    }

    return {
      name,
      description,
      category,
      categories,
      isEdit,
      createDish,
      handleFileChange,
      editDish,
      deleteDish,
      selectedImage
    }
  },
}
</script>
