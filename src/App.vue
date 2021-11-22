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

export default {
  name: 'App',
  components: {
    NavBar,
    Error,
    PopUp
  },
  setup() {
    function getToken() {
      const auth = inject<any>('Auth')
      if (!!auth) {
        const token = auth.getTokenSilently()
        store.commit('setToken', token)
        console.log(token)
      } else throw new Error('Could not find auth!')
      console.log('HI')
    }

    const auth = inject<any>('Auth')
    const popUps = computed(() => store.state.popUps)
    onMounted(() => {
      store.commit('setCategories')
      store.commit('setDishes')
      store.commit('setIngredients')
      if (auth.isAuthenticated) {
        console.log('HELLO')
        getToken()
        setInterval(getToken, 1000*60*10)
      }      
    })
    return { ...auth, popUps }
  }
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