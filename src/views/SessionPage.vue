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
    <CustomerOrderDialog :placeOrder="placeOrder" class="flex justify-center" v-if="isInSession"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import { Client } from '@stomp/stompjs'
import CustomerMenu from '../components/CustomerMenu.vue'
import CustomerOrderDialog from '../components/dialogs/CustomerOrderDialog.vue'
import { Order } from '../classes'
import store from '@/store'
import { computed } from 'vue'
import router from '@/router'

export default defineComponent({
  components: { 
    CustomerMenu, 
    ShoppingCartIcon,
    CustomerOrderDialog
  },
  setup() {
    var client: Client

    let lang = ref('')

    const isInSession = computed(() => !!store.state.currentSession)

    function handleChangeLanguage(lang:string) {
      localStorage.setItem('lang', lang)
      window.location.reload() //TODO: FIX this
    }

    onMounted(() => {
      if (!isInSession.value) router.push('/')
      lang.value = localStorage.getItem('lang') || 'en'
      store.commit('setSessionOrders')
      connect()
    }) 

    const connect = () => {
      client = new Client({
        brokerURL: process.env.VUE_APP_WS_URL,
        onConnect: () => {
          console.log('connected as costumer')
          client.subscribe('/user/topic/update-order-status', function (message) {
            const order = <Order>JSON.parse(message.body)
            const elementIndex = store.state.sessionOrders.findIndex(obj => obj.id == order.id)
            if (elementIndex == -1) store.state.sessionOrders.push(order)
            else Object.assign(store.state.sessionOrders[elementIndex], order)
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
        destination: '/ws/place-order', 
        body: JSON.stringify(order)
      })
    }

    return {
      lang,
      connect,
      disconnect,
      placeOrder,
      isInSession,
      handleChangeLanguage
    }
  }
})
</script>