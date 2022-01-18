<template>
  <div class="mx-2">
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
    <div class="overflow-x-scroll">
      <div class="flex flex-wrap flex-col items-start" style="height: 60vh">
        <div v-for="(order, index) in orders" :key="index">
          <OrderCard 
            class="mx-4"
            :order="order" 
            v-if="(!!filter) ? 
              filter == order.tableNumber : true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import OrderCard from '../components/cards/OrderCard.vue'
import store from '@/store'
import { Client } from '@stomp/stompjs'

export default defineComponent({
  components: {
    OrderCard
  },
  setup() {
    var client: Client
    const orders = computed(() => store.state.orders)
    const ingredients = computed(() => store.state.ingredients)
    const filter = computed(() => store.state.tableNumberFilter)
    
    onMounted(() => {
      store.commit('setOrders')
      store.commit('setTables')
      store.commit('setSessions')
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
      orders, filter, ingredients
    }
  }
})
</script>