<template>
  <div>
    <div class="mb-5">
      <h1>Menu</h1>
      <ul>
        <Category :category="category" v-for="category of categories" :key="category.id" />
      </ul>
      <ul>
        <li>{{dishes}}</li>
      </ul>
    </div>    
  </div>
</template>

<script>
import store from '@/store'
import { computed } from 'vue'
import Category from '../components/Category.vue'

export default {
    setup() {
      
    let categories = computed(() => store.state.categories)

    let dishes = computed(() => store.state.dishes)
    return { categories, dishes }
	},
  components:{
    Category
    }
};
</script>