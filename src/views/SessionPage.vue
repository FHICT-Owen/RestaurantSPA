<template>
  <div>
    <div class="flex flex-col text-white h-48 relative p-6" style="background-color: #FFA825">
      <ShoppingCartIcon class="self-end" />
      <div class="text-4xl w-4/5">Welcome</div>
      <div class="text-3xl w-4/5">What would you like to have?</div>
    </div>
    <CostumerMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import { Client } from '@stomp/stompjs'
import CostumerMenu from '../components/CustomerMenu.vue'

export default defineComponent({
  components: { 
    CostumerMenu, 
    ShoppingCartIcon 
  },
  setup() {
    var client: Client

    onMounted(() => connect())

    function connect() {
      client = new Client({
        brokerURL: 'ws://localhost:6969/register',
        onConnect: () => {
          console.log('connected as costumer')
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