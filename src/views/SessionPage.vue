<template>
  <div>
    <div class="h-20 flex flex-col text-white relative p-6" style="background-color: #FFA825">
      <div class="relative">
        <div class="absolute left-0">
          <h1 class="text-3xl font-semibold">Menu</h1>
        </div>
        <div class="flex self-end absolute right-0">
          <country-flag v-if="lang == 'en' " @click="handleChangeLanguage('nl')" country='nl' size='big' class="px-8 bg-no-repeat cursor-pointer"/>
          <country-flag  v-if="lang == 'nl'" @click="handleChangeLanguage('en')" country='gb' size='big' class="px-8 bg-no-repeat cursor-pointer"/>
          <ShoppingCartIcon class="w-12 cursor-pointer" style="margin-top:-4px"/>
        </div>
      </div>
    </div>
    <CustomerMenu/>
    <CustomerOrderDialog :placeOrder="placeOrder" class="flex justify-center" v-if="true /* if currentOrder > 1 dish */"/>
  </div>
</template>

<script lang="ts">
import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import { Client, StompHeaders } from '@stomp/stompjs'
import CustomerMenu from '../components/CustomerMenu.vue'
import CustomerOrderDialog from '../components/dialogs/CustomerOrderDialog.vue'
import { VueCookieNext } from 'vue-cookie-next'
import store from '@/store'
import { Order } from '../classes'

export default defineComponent({
  components: { 
    CustomerMenu, 
    ShoppingCartIcon,
    CustomerOrderDialog
  },
  setup() {
    var client: Client

    let lang = ref('')

    function handleChangeLanguage(lang:string) {
      localStorage.setItem('lang', lang)
      window.location.reload()
    }

    onMounted(() => {
      lang.value = localStorage.getItem('lang') || 'en'
      connect()
    }) 

    const connect = () => {
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
          client.subscribe('/user/topic/update-order-status', function (message) {
            console.log(message)
          })
        }
      })
      client.activate()
    }

    const disconnect = () => {
      if (!!client) client.deactivate()
    }

    const placeOrder = (order: Order) => { 
      client.publish({
        destination: '/ws/message', 
        body: JSON.stringify(order)
      })
    }

    return {
      lang,
      connect,
      disconnect,
      placeOrder,
      handleChangeLanguage
    }
  }
})
</script>