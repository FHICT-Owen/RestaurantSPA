<template>
	<dialog className="Dialog" open>
    <input className="Input" v-model="name" />
    <textarea className="TextArea" v-model="description" />
    <input type="file" className="FileUpload" @change="handleFileChange($event)" />
    <button v-if="isEdit" @click="editDish()">edit</button>
    <button v-else @click="createDish">create</button>
  </dialog>
</template>

<script lang="ts">
import store from '@/store'
import { convertFileToNumberArray } from '@/utils'
import { computed, onMounted, ref } from 'vue'

export default ({
  setup() {
    let name = ref('')
    let description = ref('')
    let image= ref([0])
    const isEdit = computed(() => store.state.isEditDialog)

    if(!store.state.isEditDialog) {
      name = ref(store.state.currentDish.name)
      description = ref(store.state.currentDish.description)
      image = ref(store.state.currentDish.image)
    }  else {
      name = ref('')
      description = ref('')
      image= ref([0])
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
      store.state.currentDish.image = await convertFileToNumberArray(e.target.files[0])
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