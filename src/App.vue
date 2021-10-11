<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
        <ul class="pop-up-position">
          <PopUp v-for="popUp of popUps" :key="popUp" :popUp="popUp" />
        </ul>
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
import PopUp from './components/PopUp.vue'
import store from '@/store'
import { computed, onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Error,
    PopUp
  },
  setup() {
    const popUps = computed(() => store.state.popUps)
    onMounted(() => {
      store.dispatch('getAllCategories')
      store.dispatch('getAllDishes')
    })
    return { popUps }
  },
}
</script>

<style>
.pop-up-position {
  position: fixed;
  top: 80%;
  left: 80%;
  transform: translate(-50%, -50%);
}

:root {
  --primary-color: #FFA825;
}
</style>

