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
      // try {
      //   if (!!auth && auth.isAuthenticated)
      //     auth.getTokenSilently().then(res => {
      //       store.commit('setToken', res)
      //       console.log(token.value)
      //     })
      //   else {
      //     var data = JSON.stringify({
      //       'client_id': 'u3pT2y3SVtSMZRuXJr1ogc4N2AN89Yge',
      //       'client_secret': 'xQ7wfhwa7kdyEwGAnuEZnYriakpJVkVyoDAdrfmb0V37uHIwHYxm3YfNFy52h82_',
      //       'audience': 'https://dev-cgiwratest.eu.auth0.com/api/v2/',
      //       'grant_type': 'client_credentials'
      //     })

      //     var config: AxiosRequestConfig = {
      //       method: 'post',
      //       url: 'https://dev-cgiwratest.eu.auth0.com/oauth/token',
      //       headers: { 
      //         'Content-Type': 'application/json'
      //       },
      //       data : data
      //     }

      //     axios(config)
      //       .then(function (response) {
      //         console.log(JSON.stringify(response.data))
      //       })
      //       .catch(function (error) {
      //         console.log(error)
      //       })
      //   }
      // } catch (error) { }

      var config: AxiosRequestConfig = {
        method: 'post',
        url: 'https://dev-cgiwratest.eu.auth0.com/oauth/token',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: process.env.VUE_APP_AUTH0_AUDIENCE,
          grant_type: 'client_credentials'
        }
      }

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    
    onMounted(() => {
      getToken()
    })
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