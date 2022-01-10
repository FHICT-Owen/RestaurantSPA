<template>
  <div>
    <div class="m-1 flex justify-between">
      <h3 v-if="!isEditMode" class="mr-3">{{category.name}}</h3>
      <h3 v-if="!isEditMode" class="mr-3">{{category.name_NL}}</h3>
      <input v-model="name" class="border-2 h-8 w-32 rounded-lg p-1" v-else @keyup.enter="editCategory"/>
      <div class="flex flex-row space-x-1 h-10">
        <CancelButton v-if="isEditMode" @click="isEditMode = false" class="my-1 ml-1 mr-0.5" />
        <EditButton v-else @click="openInput" class="my-1 ml-1 mr-0.5" />
        <DeleteButton @click="openConfirmDialog" class="my-1 ml-0.5 mr-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Category } from '../../classes'
import store from '@/store'
import {computed, defineComponent, PropType, ref} from 'vue'
import DeleteButton from '../buttons/DeleteButton.vue'
import EditButton from '../buttons/EditButton.vue'
import CancelButton from '../buttons/CancelButton.vue'

export default defineComponent({
  components: { 
    DeleteButton,
    EditButton,
    CancelButton
  },
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true
    }
  },
  setup(props) {
    let isEditMode = ref(false)
    let name = ref('')

    const openInput = () => {
      isEditMode.value = !isEditMode.value
      name.value = props.category.name
    }

    const editCategory = () => {
      store.commit('editCategory', {
        id: props.category.id,
        name: name.value
      })
      isEditMode.value = !isEditMode.value
    }

    const openConfirmDialog = () => {
      store.dispatch('openConfirmDialog', {object: props.category, function: () => store.dispatch('deleteCategory', props.category)})
    }

    return {
      isEditMode,
      openConfirmDialog,
      isDeleteMode: computed(() => store.state.isConfirmDialogOpen),
      editCategory,
      openInput,
      name
    }
  }
})
</script>