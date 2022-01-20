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
      <div class="flex flex-wrap flex-col items-start" style="height: 85vh">
        <div v-for="(order, index) in orders.sort((a, b) => a.timeStamp - b.timeStamp)" :key="index">
          <OrderCard 
            class="mx-4"
            :order="order"
            v-if="((!!tableNumberFilter) ?
              tableNumberFilter == order.tableNumber : true) && ((!!orderStateFilter) ? orderStateFilter == order.orderState : order.orderState !== 'isArchived')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import OrderCard from '../components/cards/OrderCard.vue'
import store from '@/store'
import { OrderState } from '@/types'

export default defineComponent({
  components: {
    OrderCard
  },
  setup() {
    const orders = computed(() => store.state.orders)
    const ingredients = computed(() => store.state.ingredients)
    const tableNumberFilter = computed(() => store.state.tableNumberFilter)
    const orderStateFilter = computed(() => store.state.orderStateFilter)
    
    onMounted(() => store.commit('setOrders'))

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