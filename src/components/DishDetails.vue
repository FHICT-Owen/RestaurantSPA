<template>
    <div>
      <div class="">
        <h2 class="center font-medium text-lg">{{dish.name}}</h2>
      </div>
    </div>
</template>

<script lang="ts">
import { Dish } from '@/types'
import { computed, defineComponent, PropType, ref, onMounted } from 'vue'

export default defineComponent({
  props: {
    dish: {
      type: Object as PropType<Dish>,
      required: true
    },
  },
  setup(props) {
    
  },
})
</script>
