<template>
    <div class="flex flex-col justify-center" style="max-height: 10vh">
        <div class="text-xl">Ingredients in stock</div>
         <div class="flex flex-col w-full">
            <div class="flex flex-wrap flex-row items-center gap-1 p-3 bg-white">
                <IngredientInstockCard v-for="ingredient in ingredients" :ingredient="ingredient" :key="ingredient.id" />
            </div>
        </div>
    </div>
</template>

<script>
import { inject, computed, defineComponent, onMounted } from 'vue'
import IngredientInstockCard from '@/components/cards/IngredientInstockCard.vue'
import { AuthPlugin } from '@/auth'
import store from '@/store'
export default defineComponent({
  components: {
    IngredientInstockCard
  },
  setup() {
    const ingredients = computed(() => store.state.ingredients)
    return {
      ingredients
    }
  }
})
</script>