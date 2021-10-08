<template>  
  <h5>{{category.name}}</h5>
</template>

<script lang="ts">
export default ({
  props: {
    category: {} as Category
  }
})
</script>
