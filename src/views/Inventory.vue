<template>
  <div>
    <div
      class="flex flex-col gap-1 p-3 rounded-2xl bg-white max-w-2xl m-auto"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 4px 1px inset"
    >
      <IngredientInstockCard
        v-for="ingredient in ingredients"
        :ingredient="ingredient"
        :key="ingredient.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent, onMounted } from 'vue'
import IngredientInstockCard from '@/components/cards/IngredientInstockCard.vue'
import { AuthPlugin } from '@/auth'
import store from '@/store'
export default defineComponent({
  components: {
    IngredientInstockCard,
  },
  setup() {
    const ingredients = computed(() => store.state.ingredients);
    return {
      ingredients,
    }
  },
})
</script>