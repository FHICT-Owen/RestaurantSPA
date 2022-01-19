<template>
  <!-- :class="isInStock ? 'border-green-600' : 'border-red-600'" -->
  <div
    class="flex flex-row m-0.5 p-1.5 shadow rounded-2xl gap-2 cursor-pointer hover:bg-black hover:bg-opacity-5"
  >
    <div class="my-auto ml-5">{{ ingredient.name }}</div>
    <div
      class="text-sm w-14 my-auto ml-auto"
      :class="!isInStock ? 'text-red-600' : 'text-green-600'"
    >
      {{ isInStock ? "In Stock" : "Empty" }}
    </div>
    <label class="relative inline-block w-14 h-8 my-auto">
      <input
        id="slider"
        type="checkbox"
        v-model="isInStock"
        @change="toggleIsInStock"
        hidden
      />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script lang="ts">
import { Ingredient } from '@/classes'
import store from '@/store'
import { computed, defineComponent } from '@vue/runtime-core'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    ingredient: {
      type: Object as PropType<Ingredient>,
      required: true,
    },
  },
  setup(props) {
    const toggleIsInStock = () => {
      store.commit(
        'editIngredient',
        new Ingredient(
          props.ingredient.id,
          props.ingredient.restaurantId,
          props.ingredient.name,
          props.ingredient.name_NL,
          props.ingredient.isAllergen,
          !props.ingredient.isInStock
        )
      )
    }
    return {
      isInStock: computed(() => props.ingredient.isInStock),
      toggleIsInStock,
    }
  },
})
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