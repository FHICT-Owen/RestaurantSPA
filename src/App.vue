<template>
  <div v-if="$route.meta.requiresNavBar" id="app" class="h-100">
    <NavBar />
    <div>
      <Error />
      <div>
        <router-view />
        <ul class="pop-up-position">
          <PopUp v-for="popUp of popUps" :key="popUp" :popUp="popUp" />
        </ul>
      </div>
    </div>
  </div>
  <div v-else id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue'
import Error from './components/Error.vue'
import PopUp from './components/PopUp.vue'
import store from '@/store'
import { computed, onMounted, inject } from 'vue'
import { AuthPlugin } from '@/auth'

export default {
  name: 'App',
  components: {
    NavBar,
    Error,
    PopUp
  },
  setup() {
    const popUps = computed(() => store.state.popUps)
    const token = computed(() => store.state.apiToken)
    const auth = inject<AuthPlugin>('Auth')

    const getToken = () => {
      if (!!auth && auth.isAuthenticated.value)
        auth.getTokenSilently().then(res => {
          store.commit('setToken', res)
          console.log(res)
        })
    }

    onMounted(() => {
      store.commit('setCategories')
      store.commit('setDishes')
      store.commit('setIngredients')
      store.commit('setRestaurants')
      getToken()
    })
    
    return { popUps }
  }
}
</script>

<style>
.pop-up-position {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}

:root {
  --primary-color: #FFA825;
}
</style>