<template>
  <div class="text-center hero">
    <img class="mb-3 app-logo" src="/logo.png" alt="Vue.js logo" width="120" />
    <h1 class="mb-4">Vue.js Sample Project</h1>
    <p class="lead">
      This is a sample application that demonstrates an authentication flow for
      an SPA, using
      <a href="https://vuejs.org">Vue.js</a>
    </p>
    <p v-if="isAuthenticated && !loading">
      <ButtonOption />
      <ButtonComp />
    </p>
  </div>
</template>

<script>
import ButtonOption from './ButtonOptionApi.vue'
import ButtonComp from './ButtonCompositionApi.vue'
import { inject } from 'vue'

export default {
  inject: ['Auth'],
  components: {
    ButtonOption,
    ButtonComp
  },
  setup () {
    const auth = inject('Auth')
    return { ...auth }
  }
}
</script>
