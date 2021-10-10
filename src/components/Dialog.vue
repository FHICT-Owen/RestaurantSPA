<template>
  <div class="DialogCard">
    <dialog class="Dialog" open>
      <div class="ImageContainer" style="background-image: url('https://picsum.photos/200/300')">
        <label class="ChooseImage" for="FileUpload">
          Choose Image...
        </label>
        <input
        type="file"
        id="FileUpload"
        @change="handleFileChange($event)"
      />
      </div>
      <input class="Input" v-model="name" />
      <textarea class="TextArea" v-model="description" />
      
      <span v-if="isEdit">
        <select v-model="category">
          <option v-for="category of categories" :key="category.id">
            {{ category.name }}
          </option>
        </select>
        <button class="DeleteButton" @click="deleteDish">delete</button>
        <button @click="editDish">edit</button>
      </span>
      <span v-else>
        <button @click="createDish">create</button>
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
import store from "@/store";
import { convertFileToNumberArray, convertNumberArrayToImageUrl } from "@/utils";
import { computed, ref } from "vue";

export default {
  setup() {
    let name = ref("");
    let description = ref("");
    let image = ref([0]);
    let selectedImage = ref('');
    let category = ref("");
    const categories = computed(() => store.state.categories);
    const isEdit = computed(() => store.state.isEditDialog);

    if (isEdit) {
      name.value = store.state.currentDish.name;
      description.value = store.state.currentDish.description;
      image.value = store.state.currentDish.image;
      category.value = store.state.currentDish.category;
    } else {
      name.value = "";
      description.value = "";
      image.value = [0];
      category.value = "";
    }

    const createDish = () => {
      store
        .dispatch("createNewDish", {
          id: 0,
          name: name.value,
          description: description.value,
          image: image.value,
          category: category.value,
        })
        .then(() => {
          store.dispatch("getAllDishes");
        });
    };

    function editDish() {
      store
        .dispatch("editDish", {
          id: store.state.currentDish.id,
          name: name.value,
          description: description.value,
          image: image.value,
          category: category.value,
        })
        .then(() => {
          store.dispatch("getAllDishes");
        });
    }

    function deleteDish() {
      store
        .dispatch("deleteDish", {
          id: store.state.currentDish.id,
          name: name.value,
          description: description.value,
          image: image.value,
          category: category.value,
        })
        .then(() => {
          store.dispatch("getAllDishes");
        });
    }

    const handleFileChange = async (e: any) => {
      console.log(URL.createObjectURL(e.target.files[0]));
      image.value = await convertFileToNumberArray(e.target.files[0]);
      console.log(image);
      selectedImage.value = URL.createObjectURL(e.target.files[0]);
    };

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
    };
  },
};
</script>


<style>
.DialogCard {
  transform: translateY(-50%);

  position: relative;
  width: 350px;
  height: 466px;
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

#FileUpload {
  /* width: 100%; */
  display: none;
}
</style>
