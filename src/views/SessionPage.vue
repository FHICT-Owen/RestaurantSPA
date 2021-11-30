<template>
  <div>
    <div class="flex flex-col text-white h-48 relative p-6" style="background-color: #FFA825">
      <ShoppingCartIcon class="self-end" />
      <div class="text-4xl w-4/5">Welcome</div>
      <div class="text-3xl w-4/5">What would you like to have?</div>
    </div>
    <CustomerMenu />
    <CustomerOrderDialog :placeOrder="placeOrder" class="flex justify-center" v-if="true /* if currentOrder > 1 dish */"/>
  </div>
</template>

<script lang="ts">
import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import { defineComponent, onMounted } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import { Client } from '@stomp/stompjs'
import CustomerMenu from '../components/CustomerMenu.vue'
import CustomerOrderDialog from '../components/CustomerOrderDialog.vue'
import { VueCookieNext } from 'vue-cookie-next'
import store from '@/store'
import Order from '@/classes/Order'

export default defineComponent({
  components: { 
    CustomerMenu, 
    ShoppingCartIcon,
    CustomerOrderDialog
  },
  setup() {
    var client: Client

    onMounted(() => connect())

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
        }
      })
      client.activate()
    }

    const disconnect = () => {
      if (!!client) client.deactivate()
    }

    const placeOrder = (order: Order) =>
      client.publish({destination: '/app/message', body: JSON.stringify(order)})

    return {
      connect,
      disconnect,
      placeOrder
    }
  }
})
</script>