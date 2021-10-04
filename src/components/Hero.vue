<template>
  <div class="text-center hero">
    <img class="mb-3 app-logo" src="/logo.png" alt="Vue.js logo" width="120" />
    <h1 class="mb-4">Vue.js Sample Project</h1>
    <p class="lead">
      This is a sample application that demonstrates an authentication flow for an SPA, using
      <a
        href="https://vuejs.org"
      >Vue.js</a>
    </p>
    <button @click="increment">increment: count {{count}}</button>
  </div>
</template>

<script lang="ts">
import store from '@/store';

export default {
  name: "Hero",
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      store.dispatch('increment')
      this.count = store.state.count
    }
  },
};
</script>
