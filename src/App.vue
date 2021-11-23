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
import axios, { AxiosRequestConfig } from 'axios'

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
          console.log(token.value)
        })
      else {
        var config: AxiosRequestConfig = {
          method: 'post',
          url: 'http://127.0.0.1:8000/https://dev-cgiwratest.eu.auth0.com/oauth/token',
          headers: { 
            'Content-Type': 'application/json'
          },
          data: {
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            audience: process.env.VUE_APP_AUTH0_AUDIENCE,
            grant_type: 'client_credentials'
          }
        }

        axios(config)
          .then(function (response: any) {
            store.commit('setToken', response.data.access_token)
            console.log(token.value)
          })
          .catch(function (error) {
            console.log(error)
          })
      }      
    }
    
    onMounted(() => getToken())
    
    return { popUps }
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