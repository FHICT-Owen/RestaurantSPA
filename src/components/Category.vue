<template>
  <div class="q-pa-md q-gutter-sm">
    <div>
      <h3 v-if="!isEditMode" @click="openInput" style="display:inline" class="mr-3">{{category.name}} </h3>
      <input v-model="name" v-else @keyup.enter="editCategory">
      <!-- <button class="btn btn-danger btn-sm rounded" style="display:inline" @click="deleteCategory">X</button> -->
      <q-btn label="Delete" color="danger" @click="confirm = true" />


      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Are you sure you want to delete this category?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="primary" v-close-popup @click="deleteCategory()" />
          </q-card-actions>
        </q-card>
      </q-dialog>


    </div>
  </div>
</template>

<script lang="ts">
  import ConfirmDialog from '../components/ConfirmDialog.vue'
  import store from '@/store'
  import {ref} from 'vue'
  import {useQuasar} from 'quasar'

  export default ({
    props: {
      category: {} as Category
    },
    setup(props: {
      category: Category
    }) {
      const $q = useQuasar()

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
        store.dispatch('editCategory', {
          id: props.category.id,
          name: name.value
        }).then(() => {
          store.dispatch('getAllCategories')
        })
        isEditMode.value = !isEditMode.value
      }

      function confirm() {
        $q.dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete this category',
          cancel: true,
          persistent: true
        }).onOk(() => {
          console.log('>>>> OK')
        }).onOk(() => {
          // console.log('>>>> second OK catcher')
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }
      return {
        deleteCategory,
        isEditMode,
        editCategory,
        openInput,
        name,
        confirm: ref(false),
        ConfirmDialog,
      }
    }
  })
</script>