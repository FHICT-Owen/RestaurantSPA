<template>
  <div>
    <div class="mb-5">
      <h1>Menu</h1>
      <ul>
        <li v-for="category of categories" :key="category.id">{{categories}}</li>
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
    return { categories }
	}
};
</script>