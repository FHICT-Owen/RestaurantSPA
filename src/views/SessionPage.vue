<template>
  <div class="flex flex-col text-white h-48 relative p-6" style="background-color: #FFA825">
    <div class="flex self-end">
      <country-flag @click="handleChangeLanguage('nl')" country='nl' size='big' class="px-8 bg-no-repeat cursor-pointer"/>
      <country-flag @click="handleChangeLanguage('en')" country='gb' size='big' class="px-8 bg-no-repeat cursor-pointer"/>
      <ShoppingCartIcon class="w-12 cursor-pointer" style="margin-top:-4px"/>
    </div>

    <div class="flex-row text-4xl w-4/5">{{ $t('greeting') }}</div>
    <div class="flex-row text-3xl w-4/5">{{ $t('question') }}</div>


  </div>

      <CustomerMenu/>

    <CustomerOrderDialog :placeOrder="placeOrder" class="flex justify-center" v-if="true /* if currentOrder > 1 dish */"/>
</template>

<script lang="ts">
import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import { defineComponent, onMounted } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import { Client } from '@stomp/stompjs'
import CostumerMenu from '../components/CustomerMenu.vue'
import { VueCookieNext } from 'vue-cookie-next'
import store from '@/store'
import Order from '@/classes/Order'

export default defineComponent({
  components: { 
    CostumerMenu, 
    ShoppingCartIcon 
  },
  methods: {
    handleChangeLanguage(lang:string) {
      localStorage.setItem('lang', lang)
      window.location.reload()
    }
  },
  setup() {
    var client: Client

    onMounted(() => connect())

    function connect() {
      // const cookie = VueCookieNext.getCookie('GenericRestaurantSesh')
      // let sessionPromise
      // try { sessionPromise = SessionDataService.getSessionByCookie(cookie) } catch { return router.push('menu')}
      // sessionPromise.then(session => {
      //   store.commit('setSessionId', session.id)
      //   console.log(session.id)
      // })
      client = new Client({
        brokerURL: 'ws://localhost:6969/register',
        onConnect: () => {
          console.log('connected as costumer')
          client.subscribe('/topic/errors', message => {
            console.log(message.body)
          })
        }
      })
      client.activate()
    }

    function disconnect() {
      if (client != null) client.deactivate()
    }

    function placeOrder() {
      const data = JSON.stringify(
        new Order(
          1, 
          [
            'Hamburger', 
            'Fries', 
            'Salad'
          ], 
          'Add salt'
        )
      )
      console.log(data)
      client.publish({destination: '/app/message', body: data})
    }

    return {
      connect,
      disconnect,
      placeOrder
    }
  }
})
</script>