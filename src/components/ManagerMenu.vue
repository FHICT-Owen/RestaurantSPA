<template>
  <div class="mx-2">
    <div class="justify-center w-full lg:w-3/5">
      <h2 class="text-4xl p-1 my-2">Categories</h2>
      <div
        class=" rounded-lg p-2 bg-white"
        style="box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);"
      >
        <button class="bg-gray-200 rounded-lg p-1" @click="createCategory">
          New category
        </button>
        <input
          class="border-2 rounded-lg p-1 mx-2"
          v-model="category"
          placeholder="Enter english category name ..."
        />
        <input
          class="border-2 rounded-lg p-1 mx-2"
          v-model="categoryNL"
          placeholder="Enter dutch category name ..."
        />
        <CategoryCard
          v-for="category of categories"
          :key="category.id"
          :category="category"
        />
      </div>
      <h2 class="text-4xl p-1 my-2">Ingredients</h2>
      <div
        class="rounded-lg p-2 bg-white w-full"
        style="box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);"
      >
        <button class="bg-gray-200 rounded-lg p-1" @click="createIngredient">
          New ingredient
        </button>
        <input
          class="border-2 rounded-lg p-1 mx-2"
          v-model="ingredient"
          placeholder="Enter english ingredient name ..."
        />
        <input
          class="border-2 rounded-lg p-1 mx-2"
          v-model="ingredientNL"
          placeholder="Enter dutch ingredient name ..."
        />
        <input type="checkbox" @change="setIsAllergen" />
        
        <IngredientCard
          v-for="ingredient of ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
        />
      </div>
      <h2 class="text-4xl p-1 my-2">Dishes</h2>
      <div
        class="rounded-lg p-2 bg-white"
        style="box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);"
      >
        <button class="bg-gray-200 rounded-lg p-2" @click="toggleDialog">
          New dish
        </button>
        <div class="flex flex-col" v-for="dish of dishes" :key="dish.id">
          <DishCard class="w-full" :dish="dish" />
          <div class="flex flex-row justify-end rounded-lg mt-1.5 h-10">
            <EditButton
              @click="openEditDialog(dish)"
              class="w-full md:w-1/4 my-1 ml-1 mr-0.5"
            />
            <DeleteButton
              @click="openConfirmDialog(dish)"
              class="w-full md:w-1/4 my-1 ml-0.5 mr-1"
            />
          </div>
        </div>
      </div>
    </div>
    <Dialog v-if="isDishDialogOpen" :key="isDishDialogOpen" />
  </div>
</template>

<script lang="ts">
import CategoryCard from "./cards/CategoryCard.vue";
import DishCard from "./cards/DishCard.vue";
import Dialog from "./dialogs/DishDialog.vue";
import store from "@/store";
import { computed, defineComponent, ref } from "vue";
import DeleteButton from "./buttons/DeleteButton.vue";
import EditButton from "./buttons/EditButton.vue";
import IngredientCard from "./cards/IngredientCard.vue";
import { Ingredient, Category, Dish } from "../classes";

export default defineComponent({
  components: {
    CategoryCard,
    DishCard,
    Dialog,
    DeleteButton,
    EditButton,
    IngredientCard,
  },
  setup() {
    const categories = computed(() => store.state.categories);
    const dishes = computed(() => store.state.dishes);
    const ingredients = computed(() => store.state.ingredients);
    const isDishDialogOpen = computed(() => store.state.isDishDialogOpen);
    let isAllergen = ref(false);

    const toggleDialog = () => {
      store.dispatch("toggleDialog", false);
      store.dispatch("setCurrentDish", {});
    };

    const openEditDialog = (dish: Dish) => {
      store.dispatch("toggleDialog", true);
      store.dispatch("setCurrentDish", dish);
    };

    const openConfirmDialog = (dish: Dish) => {
      store.commit("toggleConfirmDialog", {
        object: dish,
        function: () => store.dispatch("deleteDish", dish),
      });
    };

    let category = ref("");
    let categoryNL = ref("");
    const createCategory = () => {
      store.commit(
        "addCategory",
        new Category(category.value, categoryNL.value)
      );
      category.value = "";
      categoryNL.value = "";
    };

    let ingredient = ref("");
    let ingredientNL = ref("");
    const createIngredient = () => {
      store.commit(
        "addIngredient",
        new Ingredient(
          0,
          0,
          ingredient.value,
          ingredientNL.value,
          isAllergen.value,
          false
        )
      );
      ingredient.value = "";
      ingredientNL.value = "";
    };

    const setIsAllergen = (e: any) => {
      isAllergen.value = e.target.checked;
    };

    return {
      categories,
      dishes,
      isDishDialogOpen,
      toggleDialog,
      category,
      categoryNL,
      createCategory,
      openEditDialog,
      openConfirmDialog,
      ingredients,
      ingredient,
      ingredientNL,
      createIngredient,
      setIsAllergen,
    };
  },
});
</script>

<style scoped>
/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgba(245, 158, 11);
}

input:focus + .slider {
  box-shadow: 0 0 1px rgba(245, 158, 11);
}

input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
