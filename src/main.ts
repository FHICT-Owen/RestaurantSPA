import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Auth0 } from '@/auth'
import './assets/tailwind.css'
import store, { key } from './store'
import { VueCookieNext } from 'vue-cookie-next'
import './registerServiceWorker'
import CountryFlag from 'vue-country-flag-next'
import i18n from '@/i18n'


async function init () {
  const AuthPlugin = await Auth0.init({
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      )
    },
    clientId: process.env.VUE_APP_AUTH0_CLIENT_KEY || '',
    domain: process.env.VUE_APP_AUTH0_DOMAIN || '',
    audience: process.env.VUE_APP_AUTH0_AUDIENCE || '',
    redirectUri: window.location.origin
  })
  
  const app = createApp(App)
  app
    .use(i18n)
    .use(AuthPlugin)
    .use(store, key)
    .use(router)
    .use(VueCookieNext)
    .use(CountryFlag)
    .mount('#app')
  VueCookieNext.config({
    expire: '4h',
    path: '/',
    domain: '',
    secure: 'true',
    sameSite: '',
  })
}

init()