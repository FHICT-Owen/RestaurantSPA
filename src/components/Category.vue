<template>
  <div>
    <div class="m-1 flex justify-between">
      <h3 v-if="!isEditMode" @click="openInput" style="display:inline" class="mr-3">{{category.name}} </h3>
      <input v-model="name" v-else @keyup.enter="editCategory"/>
      <button 
        class="text-white rounded-3xl px-3 py-1 bg-red-500 hover:bg-red-600" 
        @click="openConfirmDialog"
      >Delete</button>
    </div>
    <ConfirmDialog v-if="isDeleteMode" :object="category" />
  </div>
</template>

<script lang="ts">
import store from '@/store'
import {computed, ref} from 'vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

export default ({
  components: {
    ConfirmDialog
  },
  props: {
    category: {} as Category
  },
  setup(props: { category: Category }) {
    let isEditMode = ref(false)
    let isDeleteMode = computed(() => store.state.isConfirmDialogOpen)
    
    let name = ref('')

    function openInput() {
      isEditMode.value = !isEditMode.value
      name.value = props.category.name
    }

    function editCategory() {
      store.dispatch('editCategory', {
        id: props.category.id,
        name: name.value
      }).then(() => {
        store.dispatch('getAllCategories')
      })
      isEditMode.value = !isEditMode.value
    }

    const openConfirmDialog = () => {
      store.state.isConfirmDialogOpen = true
    }

    return {
      isEditMode,
      isDeleteMode,
      editCategory,
      openConfirmDialog,
      openInput,
      name
    }
  }
})
</script>