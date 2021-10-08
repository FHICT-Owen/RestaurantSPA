<template>
	<dialog class="Dialog" open>
    <input class="Input" v-model="name" />
    <textarea class="TextArea" v-model="description" />
    <input type="file" class="FileUpload" @change="handleFileChange($event)" />
    <span v-if="isEdit"> 
      <button class="DeleteButton" @click="deleteDish">delete</button>
      <button  @click="editDish">edit</button>
    </span>
    <button v-else @click="createDish">create</button>
  </dialog>
</template>

<script lang="ts">
import store from '@/store'
import { convertFileToNumberArray } from '@/utils'
import { computed, ref } from 'vue'

export default ({
  setup() {
    let name = ref('')
    let description = ref('')
    let image = ref([0])
    const isEdit = computed(() => store.state.isEditDialog)

    if(isEdit) {
      name.value = store.state.currentDish.name
      description.value = store.state.currentDish.description
      image.value = store.state.currentDish.image
    } else {
      name.value = ''
      description.value = ''
      image.value = [0]
    }

    const createDish = () => {
      store.dispatch('createNewDish', {id: 0, name: name.value, description: description.value, image: image.value})
      store.dispatch('getAllDishes')
    }

    function editDish() {
      store.dispatch('editDish', {id: store.state.currentDish.id, name: name.value, description: description.value, image: image.value})
      store.dispatch('getAllDishes')
    }

    const handleFileChange = async (e: any) => {
      image.value = await convertFileToNumberArray(e.target.files[0])
    }

    return { name, description, isEdit, createDish, handleFileChange, editDish }
  },
})
</script>


<style>
.Dialog {
	position:fixed;
	top: 50%;
	transform: translateY(-50%);
	width: 400px;
	height: 400px;
}

.Input {
	width: 100%;
}

.TextArea {
	width: 100%;
	height: 50%;
	resize: none;
}

.FileUpload {
	width: 100%;
}
</style>