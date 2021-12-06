<template>
  <div class="container">
    <div class="flex content-end">
      <ul class="flex my-5">
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline">All</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">Done</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">Preparing</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">New</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline " href="#">Archive</a>
        </li>
      </ul>
    </div>
    <div class="container flex flex-wrap items-start">
      <div v-for="(order, index) in orders" :key="index">
        <OrderCard v-if="order.isApproved" :order="order" class="mx-4"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent, onMounted } from 'vue'
import OrderCard from '../components/cards/OrderCard.vue'
import store from '@/store'
import { AuthPlugin } from '@/auth'
import { Client } from '@stomp/stompjs'
import { ref } from 'vue'
export default defineComponent({
  components: {
    OrderCard
  },
  setup() {
    var client: Client
    const auth = inject<AuthPlugin>('Auth')
    const orders = computed(() => store.state.orders)
    onMounted(() => {
      store.commit('setOrders')
      connectAsLiveView()
    })

    function connectAsLiveView() {
      client = new Client({
        brokerURL: 'ws://localhost:6969/register',
        onConnect: () => {
          console.log('connected as live-view')
          client.subscribe('/queue/live-view', message => {
            store.commit('addOrder', JSON.parse(message.body))
            console.log(message.body)
          })
        }
      })
      client.activate()
    }

    return {
      ...auth, orders
    }
  }
})
</script>