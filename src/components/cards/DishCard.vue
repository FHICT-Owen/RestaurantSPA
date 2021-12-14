<template>
  <div class="flex flex-col">
    <div
      class="flex flex-row rounded-3xl h-24 mt-3"
      style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1)">
      <div
        class="flex rounded-3xl m-1 bg-blend-normal bg-cover bg-no-repeat"
        :style="{ background: dish.image, minHeight: imgSize, minWidth: imgSize }">
          <div v-if="countOccurrences() > 0"
            class="z-10 px-9 py-7 rounded-3xl text-2xl bg-opacity-60 text-white align-self-center">
            {{countOccurrences()}}
          </div>
      </div>
      <div class="relative flex-1 m-1">
        <div class="absolute right-0 -top-4 shadow-lg py-1 px-4 rounded-full text-green-500 capitalize italic bg-white text-sm">
          Vegantarian, Vegan, Lactose
          {{ log(dish) }}
        </div>
        <h5 v-if="lang == 'en' " class="font-medium text-lg">{{ dish.name }}</h5>
        <h5 v-else-if="lang == 'nl' " class="font-medium text-lg">{{ dish.name_NL }}</h5>
        <p v-if="lang == 'en' " class="text-gray-400" style="font-size: 0.85rem; line-height: 1rem">
          {{ dish.description }}
        </p>
        <p v-else-if="lang == 'nl' " class="text-gray-400" style="font-size: 0.85rem; line-height: 1rem">
          {{ dish.description_NL }}
        </p>
      </div>
    </div>
    <div v-if="inInSession" class="flex flex-row justify-around rounded-3xl mt-1.5 h-10">
      <button 
        @click="addDishToCurrentOrder"
        class="text-white font-medium text-sm w-2/5 rounded-3xl p-1 my-1 ml-1 mr-0.5" style="background-color: rgb(255, 168, 37)">
        ADD
      </button>
      <button 
        @click="removeDishFromCurrentOrder"
        class="bg-red-500 text-white font-medium text-sm w-2/5 rounded-3xl p-1 my-1 ml-0.5 mr-1">
        REMOVE
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { computed, defineComponent, PropType, ref, onMounted } from 'vue'

export default defineComponent({
  props: {
    dish: {
      type: Object as PropType<Dish>,
      required: true,
    },
  },
  methods: {
    log(order:any) {
      console.log(order)
    }
  },
  setup(props) {
    const dishes = computed(() => store.state.currentOrder.dishes)
    const inInSession = computed(() => store.state.sessionId.length > 0) //TODO: make a proper check for sessionId checking
    
    const countOccurrences = () => 
      dishes.value.reduce((a, v) => (v === props.dish.name ? a + 1 : a), 0)

    const addDishToCurrentOrder = () => 
      store.commit('addOrder', props.dish)

    const removeDishFromCurrentOrder = () => 
      store.commit('removeOrder', props.dish)

    let lang = ref('')
    onMounted(() => {
      lang.value = localStorage.getItem('lang') || 'en'
    })

    return { 
      lang,
      imgSize: ref('88px'), 
      inInSession,
      countOccurrences,
      addDishToCurrentOrder,
      removeDishFromCurrentOrder
    }
  },
})
</script>
