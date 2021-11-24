<template>
  <div>
    <div class="flex flex-col text-white h-48 relative p-6" style="background-color: #FFA825">
      <ShoppingCartIcon class="self-end" />
      <div class="text-4xl w-4/5">Welcome</div>
      <div class="text-3xl w-4/5">What would you like to have?</div>
    </div>
    <CostumerMenu />
    <button @click="connect">Connect</button>
    <button @click="disconnect">Disconnect</button>
    <button @click="send">Send</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import { Client, CompatClient, Stomp, StompHeaders } from '@stomp/stompjs'
import CostumerMenu from '../components/CustomerMenu.vue'
import store from '@/store'

export default defineComponent({
  components: { 
    CostumerMenu, 
    ShoppingCartIcon 
  },
  setup() {
    var client: Client

    function connect() {
      client = new Client({
        brokerURL: 'ws://localhost:6969/register',
        onConnect: () => {
          console.log('onConnect')
          client.subscribe('/topic/reply', message => {
            console.log(message.body)
          })
        }
      })
      client.activate()
    }

    function disconnect() {
      if (client != null) client.deactivate()
    }

    function send() {
      var data = JSON.stringify({
        'name' : 'yeett'
      })
      client.publish({destination: '/app/message', body: data})
    }

    return {
      connect,
      disconnect,
      send
    }
  }
})
</script>