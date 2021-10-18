<template>
  <div class="DialogCard">
    <dialog class="Dialog" open>
      <div class="ImageContainer" :style="{background: selectedImage}">
        <label class="ChooseImage" for="FileUpload">
          Choose Image...
        </label>
        <input
        type="file"
        id="FileUpload"
        @change="handleFileChange($event)"
      ></div>
      <input class="Input" v-model="name" />
      <textarea class="TextArea" v-model="description" />
      
      <span v-if="isEdit">
        <select v-model="category">
          <option v-for="category of categories" :key="category.id">
            {{ category.name }}
          </option>
        </select>
        <div class="DeleteButton" @click="deleteDish">Delete</div>
        <div class="SaveButton" @click="editDish">Save</div>
      </span>
      <span v-else>
        <button @click="createDish">Create</button>
        <select v-model="category">
          <option v-for="category of categories" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </span>
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


<style>
.DialogCard {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  /* position: relative; */
  width: 350px;
  height: 607px;
  border-radius: 40px;
  background: #ffffff;
  box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
}

.Dialog {
  /* Change to center page */
  padding: 0;
  width: 330px;
  display: flex;
  flex-direction: column;
  border-radius: 40px;
  border-style: none;
}

.ImageContainer {
  width: 330px;
  margin-top: 2.86%;
  /* background: url("https://picsum.photos/200/300"), #000000; */
  mix-blend-mode: normal;
  border-radius: 29px;
  height: 330px;
  justify-content: flex-end;
  display: flex;
}

.Input {
  border-style: none;
}

.TextArea {
  /* width: 100%; */
  height: 50%;
  resize: none;
  border-style: none;
}

.ChooseImage {
  justify-self: flex-end;
  align-self: flex-end;
  color: var(--primary-color);
  background-color: white;
  border-style: solid;
  border-radius: 40px;
  border-width: 0.2em;
  padding: 2px 8px;
  margin-bottom: 0.4rem;
  margin-right: 0.5rem;
}

.ChooseImage:hover {
  cursor: pointer;
}

.DeleteButton {
  width: min-content;
  padding: 2%;
  background: #FF0000;
  border-radius: 32px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  align-items: center;
  text-align: center;

  color: #FFFFFF;
}
.DeleteButton:hover {
  cursor: pointer;
}

.SaveButton {
  width: min-content;
  padding: 2%;
  font-family: SF Pro Display;
  font-style: italic;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  align-items: center;
  text-align: center;
  border: 2.5px solid #FFA825;
  border-radius: 32px;

  color: #FFA825;
}
.SaveButton:hover {
  cursor: pointer;
}

#FileUpload {
  /* width: 100%; */
  display: none;
}
</style>
