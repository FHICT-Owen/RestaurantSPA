<template>
  <div class="flex flex-row justify-between gap-2 rounded-sm shadow m-1 px-1">
    
       <div class="flex flex-row flex-1 flex-wrap gap-2 items-center">
          <h3>{{ ingredient.name }}</h3>
          <h3 class="font-thin">{{ ingredient.name_NL }}</h3>
        </div>

      <div class="flex flex-row flex-1  justify-center">
        <div class="flex flex-row flex-wrap items-center gap-2">
          <div class="text-sm">Is Allergen</div>
          <label class="relative inline-block w-14 h-8 my-auto">
            <input
              id="slider"
              type="checkbox"
              v-model="isAllergen"
              @change="toggleAllergen"
              hidden
            />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="flex flex-row flex-1 justify-end my-auto h-10">
        <CancelButton
          v-if="isEditMode"
          @click="isEditMode = false"
          class="my-1 ml-1 mr-0.5"
        />
        <DeleteButton @click="openConfirmDialog" class="my-1 mr-1" />
      </div>
    
  </div>
</template>

<script lang="ts">
import { Ingredient } from "../../classes";
import store from "@/store";
import { computed, defineComponent, PropType, ref } from "vue";
import DeleteButton from "../buttons/DeleteButton.vue";
import CancelButton from "../buttons/CancelButton.vue";

export default defineComponent({
  components: {
    DeleteButton,
    CancelButton,
  },
  props: {
    ingredient: {
      type: Object as PropType<Ingredient>,
      required: true,
    },
  },
  setup(props) {
    let isEditMode = ref(false);
    let name = ref("");

    const openConfirmDialog = () => {
      store.commit("toggleConfirmDialog", {
        object: props.ingredient,
        function: () => store.dispatch("deleteIngredient", props.ingredient),
      });
    };

    const toggleAllergen = () => {
      store.commit(
        "editIngredient",
        new Ingredient(
          props.ingredient.id,
          props.ingredient.restaurantId,
          props.ingredient.name,
          props.ingredient.name_NL,
          !props.ingredient.isAllergen,
          props.ingredient.isInStock
        )
      );
    };

    return {
      isEditMode,
      openConfirmDialog,
      isDeleteMode: computed(() => store.state.isConfirmDialogOpen),
      isAllergen: computed(() => props.ingredient.isAllergen),
      name,
      toggleAllergen,
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
