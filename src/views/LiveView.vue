<template>
  <div class="mx-2">
    <div class="flex">
      <button class="rounded py-1 px-3 ml-4 mr-1 my-2 bg-blue-500 text-white" @click="setStateAll">All</button>
      <button class="rounded py-1 px-3 mx-1 my-2 bg-blue-500 text-white" @click="setStateApproved">New</button>
      <button class="rounded py-1 px-3 mx-1 my-2 bg-blue-500 text-white" @click="setStatePreparing">Preparing</button>
      <button class="rounded py-1 px-3 mx-1 my-2 bg-blue-500 text-white" @click="setStateReady">Done</button>
      <button class="rounded py-1 px-3 mx-1 my-2 bg-blue-500 text-white" @click="setStateArchived">Archive</button>
    </div>
    <div class="overflow-x-scroll">
      <div class="flex flex-wrap flex-col items-start" style="height: 60vh">
        <div v-for="(order, index) in orders" :key="index">
          <OrderCard 
            class="mx-4"
            :order="order"
            v-if="((!!tableNumberFilter) ?
              tableNumberFilter == order.tableNumber : true) && ((!!orderStateFilter) ? orderStateFilter == order.orderState : true)"/>
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
import { OrderState } from '@/types'

export default defineComponent({
  components: {
    OrderCard
  },
  setup() {
    var client: Client
    const orders = computed(() => store.state.orders)
    const ingredients = computed(() => store.state.ingredients)
    const tableNumberFilter = computed(() => store.state.tableNumberFilter)
    const orderStateFilter = computed(() => store.state.orderStateFilter)
    
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

    const setStateAll = () => 
      store.commit('setOrderStateFilter', null)
    const setStateReady = () => 
      store.commit('setOrderStateFilter', OrderState.isReady)
    const setStatePreparing = () => 
      store.commit('setOrderStateFilter', OrderState.isBeingPrepared)
    const setStateApproved = () => 
      store.commit('setOrderStateFilter', OrderState.isApproved)
    const setStateArchived = () => 
      store.commit('setOrderStateFilter', OrderState.isArchived)
      
    return {
      orders, 
      tableNumberFilter, 
      orderStateFilter, 
      ingredients, 
      setStateAll, 
      setStateReady, 
      setStatePreparing, 
      setStateApproved, 
      setStateArchived
    }
  }
})
</script>