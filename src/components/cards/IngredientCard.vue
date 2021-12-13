<template>
  <div>
    <div class="m-1 flex justify-between">
      <div class="flex flex-row">
        <h3 class="mr-3">{{ingredient.name}}</h3>
        <input id="AllergenCheckbox" type="checkbox" v-model="isAllergen" disabled>
        <label for="AllergenCheckbox">is allergen</label>
      </div>
      <div class="flex flex-row space-x-1 h-10">
        <CancelButton v-if="isEditMode" @click="isEditMode = false" class="my-1 ml-1 mr-0.5" />
        <DeleteButton @click="openConfirmDialog" class="my-1 ml-0.5 mr-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Ingredient from '@/classes/Ingredient'
import store from '@/store'
import {computed, defineComponent, PropType, ref} from 'vue'
import DeleteButton from '../buttons/DeleteButton.vue'
import CancelButton from '../buttons/CancelButton.vue'

export default defineComponent({
  components: { 
    DeleteButton,
    CancelButton
  },
  props: {
    ingredient: {
      type: Object as PropType<Ingredient>,
      required: true
    }
  },
  setup(props) {
    let isEditMode = ref(false)
    let name = ref('')

    const openConfirmDialog = () => {
      store.dispatch('openConfirmDialog', {object: props.ingredient, function: () => store.dispatch('deleteIngredient', props.ingredient)})
    }

    return {
      isEditMode,
      openConfirmDialog,
      isDeleteMode: computed(() => store.state.isConfirmDialogOpen),
      isAllergen: computed(() => props.ingredient.isAllergen),
      name
    }
  }
})
</script>