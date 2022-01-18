<template>
  <div 
    class="w-64 text-white mb-3 rounded-lg shadow" 
    :class="{ 
      'bg-blue-500' : order.orderState === 'isApproved', 
      'bg-yellow-500': order.orderState === 'isBeingPrepared', 
      'bg-green-500': order.orderState === 'isReady',
      'bg-gray-500': order.orderState === 'isArchived',
      'bg-red-500': order.orderState === 'isCanceled'
      }" style="max-width: 18rem">
    <!-- TODO: bg-color depends on order status -->
    <div class="px-3 py-2 flex justify-between rounded-t-lg">
      <div class="flex flex-col justify-between">
        <p class="text-xl">{{new Date(order.timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}}</p>
        <h5 class="text-xl">#{{order.id}}</h5>
      </div>
    <div class="flex flex-col justify-between">
      <div class="flex space-x-2">
        <ReplyIcon @click="revertOrder" class="w-6 h-6 cursor-pointer rounded-md shadow"/>
        <BanIcon @click="cancelOrder" class="w-6 h-6 cursor-pointer rounded-md shadow"/>
        <CheckIcon @click="prepareOrder" class="h-6 w-6 cursor-pointer rounded-md shadow"/>
        <FlagIcon @click="archiveOrder" class="h-6 w-6 cursor-pointer rounded-md shadow"/>
      </div>
      <h5 
        class="text-md cursor-pointer text-center px-2 py-1 rounded-md mt-2 shadow" 
        @click="filterByTable(order.tableNumber)">
        Table: {{order.tableNumber}}
      </h5>
    </div>
    </div>
    <div class="flex flex-col px-3 pb-2 rounded-b-lg text-white capitalize font-semibold max-h-64">
      <p class="text-gray-200 italic" >{{order.comments}}</p>
      <div v-for="(index, dish) in countedDishes(order.dishes)" :key="index">{{dish + ' ' + index + 'x'}}</div>
    </div>
  </div>
</template>


<script lang="ts">
import store from '@/store'
import { defineComponent, PropType} from 'vue'
import { FlagIcon, CheckIcon, BanIcon, ReplyIcon } from '@heroicons/vue/solid'
import { OrderState, Order, Table } from '@/types'
import { countedDishes } from '@/utils'

export default defineComponent({
  components: {
    FlagIcon,
    CheckIcon,
    BanIcon,
    ReplyIcon
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    }
  },
  setup(props) {
    let order = props.order

    const prepareOrder = () => {
      const orderState = OrderState[props.order.orderState]
      if (OrderState.isApproved == orderState) {
        order.orderState = OrderState.isBeingPrepared
        store.commit('editOrder', order)
      }
      else if (props.order.orderState == OrderState.isBeingPrepared){ 
        order.orderState = OrderState.isReady
        store.commit('editOrder', order)
      }
    }

    const archiveOrder = () => {
      order.orderState = OrderState.isArchived
      store.commit('editOrder', order) 
    }

    const cancelOrder = () => {
      order.orderState = OrderState.isCanceled
      store.commit('editOrder', order) 
    }  

    const revertOrder = () => {
      if (props.order.orderState == OrderState.isReady) {
        order.orderState = OrderState.isBeingPrepared
        store.commit('editOrder', order)
      }
      else { 
        order.orderState = OrderState.isApproved
        store.commit('editOrder', order)
      }
    }

    function filterByTable(tableNumber: number) {
      store.commit('setTableNumberFilter', tableNumber)
    }

    return {
      prepareOrder, 
      cancelOrder, 
      archiveOrder, 
      revertOrder, 
      filterByTable, 
      countedDishes
    }
  }
})
</script>