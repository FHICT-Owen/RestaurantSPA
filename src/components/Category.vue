<template>
  <div>
    <h5 style="display:inline">{{category.name}}</h5>
    <button style="display:inline" @click="deleteCategory">X</button>
  </div>
</template>

<script lang="ts">
import store from '@/store'

export default ({
  props: {
    category: {} as Category
  },
  setup(props: {category: Category}) {
    function deleteCategory() {
      store.dispatch('deleteCategory', props.category).then(() => {
        store.dispatch('getAllCategories')
      })
    }
    return { deleteCategory }
  }
})
</script>
