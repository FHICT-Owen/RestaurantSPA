<template>
  <div>
    <div class="m-1 flex justify-between items-center" >
			<h3 class="mr-3 cursor-pointer py-1 px-2" :class="{'bg-yellow-500 text-white rounded-xl shadow font-bold' : currentRestaurant == restaurant.id}" v-if="!isEditMode" @click="selectRestaurant(restaurant.id)">{{restaurant.name}}</h3>
			<input v-model="name" class="border-2 h-8 w-32 rounded-lg p-1" v-else @keyup.enter="editRestaurant"/>
			<div class="flex flex-row space-x-1 h-10">
        <CancelButton v-if="isEditMode" @click="isEditMode = false" class="my-1 ml-1 mr-0.5" />
        <EditButton v-else @click="openInput" class="my-1 ml-1 mr-0.5" />
        <DeleteButton @click="openConfirmDialog" class="my-1 ml-0.5 mr-1" />
			</div>
		</div>
  </div>
</template>

<script lang="ts">
import { Restaurant } from '../../classes'
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
    restaurant: {
      type: Object as PropType<Restaurant>,
      required: true
    }
  },
  setup(props) {
    let isEditMode = ref(false)
	  let name = ref('')
    const currentRestaurant = computed(() => store.state.currentRestaurant)
    const openInput = () => {
      isEditMode.value = !isEditMode.value
      name.value = props.restaurant.name
    }

    const editRestaurant = () => {
		 store.commit('editRestaurant', {
        id: props.restaurant.id,
        name: name.value
      })
      isEditMode.value = !isEditMode.value
    }

    const selectRestaurant = (id:number) => {
      store.state.currentRestaurant = id
    }

    const openConfirmDialog = () => {
      store.commit('toggleConfirmDialog', {object: props.restaurant, function: () => store.dispatch('deleteRestaurant', props.restaurant)})
    }
    return{
      isEditMode,
      openConfirmDialog,
      isDeleteMode: computed(() => store.state.isConfirmDialogOpen),
      editRestaurant,
      openInput,
      name,
      selectRestaurant,
      currentRestaurant
    }
  }
})
</script>