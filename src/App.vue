<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
        <div v-show="popUpIsOpen" class="popup">{{popUpText}}</div>
      </div>
    </div>
    <footer class="bg-light text-center p-3">
      <div class="logo"></div>
      <p>
        Sample project provided by
        <a href="https://auth0.com">Auth0</a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue'
import Error from './components/Error.vue'
import store from '@/store'
import { computed } from 'vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Error
  },
  setup() {
    const popUpIsOpen = computed(() => store.state.popUpIsOpen)
    const popUpText = computed(() => store.state.popUpText)
    return { popUpIsOpen, popUpText }
  },
  async mounted () {
    await store.dispatch('getAllCategories')
    await store.dispatch('getAllDishes')
  }
}
</script>

<style>
.popup {
  position: fixed;
  top: 80%;
  left: 80%;
  background: rgb(30, 210, 60);
  transform: translate(-50%, -50%);
}

:root {
  --primary-color: #FFA825;
}
</style>