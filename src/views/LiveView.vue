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
    <div class="flex flex-wrap items-start">
      <div v-for="(order, index) in orders" :key="index">
        <OrderCard :order="order" :table="getTable(order.sessionId)" v-if="(getTable(order.sessionId)) ? filter == getTable(order.sessionId).tableNumber || filter == 0 : true && order.isArchived == false" class="mx-4"/>
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

export default defineComponent({
  components: {
    OrderCard
  },
  setup() {
    var client: Client
    const auth = inject<AuthPlugin>('Auth')
    const filter = computed(() => store.state.filter)
    const orders = computed(() => store.state.orders)
    const tables = computed(() => store.state.tables)
    const sessions = computed(() => store.state.sessions)
    
    onMounted(() => {
      store.commit('setOrders')
      store.commit('setTables')
      store.commit('setSessions')
      connectAsLiveView()
    })
    
    function getTable(sessionId: number) {
      console.log(`Session: ${sessionId}`)
      const session = sessions.value.find(s => s.id == sessionId)
      if (!session) return
      const table = tables.value.find(t => t.id == session.tableId)
      console.log(table)
      return table
    }

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
      ...auth, orders, getTable, filter
    }
  }
})
</script>