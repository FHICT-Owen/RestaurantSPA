<template>
  <div>
    <h3 v-if="!isEditMode" @click="openInput" style="display:inline" class="mr-3">{{category.name}} </h3>
    <input v-model="name" v-else @keyup.enter="editCategory">
    <button class="btn btn-danger btn-sm rounded" style="display:inline" @click="deleteCategory">X</button>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { computed, ref } from 'vue'

export default ({
  props: {
    category: {} as Category
  },
  setup(props: {category: Category}) {
    
    // const isEditMode = computed(() => store.state.toggleCategoryInput)
    let isEditMode = ref(false)
    let name = ref('')
    function deleteCategory() {
      store.dispatch('deleteCategory', props.category).then(() => {
        store.dispatch('getAllCategories')
      })
    }
    function openInput() {
      isEditMode.value = !isEditMode.value
      name.value = props.category.name
    }

    function editCategory() {      
      store.dispatch('editCategory', {id: props.category.id, name: name.value}).then(() => {
        store.dispatch('getAllCategories')
      })
      isEditMode.value = !isEditMode.value
    }
    return { deleteCategory, isEditMode, editCategory, openInput, name }
  }
})
</script>
