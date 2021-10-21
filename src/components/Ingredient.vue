<template>
  <div class="flex-grow-0 m-0.5 p-1.5 shadow rounded-3xl">
		{{ingredient}}
  </div>	
</template>

<script lang="ts">

export default ({
  props: {
    ingredient: ''
  },
  setup(props: { ingredient: string }) {

  }
})
</script>
