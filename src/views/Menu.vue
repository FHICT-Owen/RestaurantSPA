<template>
  <div>
    <div class="mb-5">
      <h1>Menu</h1>
      <ul>
        <li>{{categories}}</li>
        <li>{{dishes}}</li>
      </ul>
    </div>    
  </div>
</template>

<script>
import store from '@/store'
import { computed } from 'vue'

export default {
    setup() {
      
    let categories = computed(() => store.state.categories)

    let dishes = computed(() => store.state.dishes)
    return { categories, dishes }
	}
};
</script>