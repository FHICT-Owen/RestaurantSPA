<template>
  <div class="mx-2">
    <div class="flex content-end">
      <ul class="flex my-5">
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" @click="setStateAll">All</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" @click="setStateReady" href="#">Done</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" @click="setStatePreparing" href="#">Preparing</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" @click="setStateApproved" href="#">New</a>
        </li>
        <li class="mr-3">
          <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" @click="setStateArchived" href="#">Archive</a>
        </li>
      </ul>
    </div>
    <div class="overflow-x-scroll">
      <div class="flex flex-wrap flex-col items-start" style="height: 60vh">
        <div v-for="(order, index) in orders" :key="index">
          <OrderCard 
            class="mx-4"
            :order="order"
            v-if="((!!tableNumberFilter) ?
              tableNumberFilter == order.tableNumber : true) && ((!!setOrderStateFilter) ? setOrderStateFilter == order.orderState : true)"/>
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
    const filterOrderState = computed(() => store.state.filterOrderState)

    
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

    const setStateAll = () => {
      store.commit('setOrderStateFilter', null)
    }
    const setStateReady = () => {
      store.commit('setOrderStateFilter', OrderState.isReady)
    }
    const setStatePreparing = () => {
      store.commit('setOrderStateFilter', OrderState.isBeingPrepared)
    }
    const setStateApproved = () => {
      store.commit('setOrderStateFilter', OrderState.isApproved)
    }
    const setStateArchived = () => {
      store.commit('setOrderStateFilter', OrderState.isArchived)
    }
    return {
      orders, tableNumberFilter, filterOrderState, ingredients, setStateAll, setStateReady, setStatePreparing, setStateApproved, setStateArchived
    }
  }
})
</script>