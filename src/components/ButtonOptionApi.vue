<template>
    <button @click="increment">increment: count {{count}} (option api) </button>
</template>

<script lang="ts">
import store from '@/store'

export default ({
  computed: {
    count (): number {
      return store.state.countOption
    }
  },
  methods: {
    increment () {
      store.dispatch('incrementOption')
    }
  }
})
</script>
