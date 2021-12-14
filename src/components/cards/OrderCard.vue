<template>
    <div class="w-64 text-white mb-3 rounded-lg shadow" v-bind:class="{ 'bg-primary' : !order.isApproved, 'bg-warning': order.isBeingPrepared, 'bg-danger': order.isCanceled, 'bg-success': order.isReady}" style="max-width: 18rem">
      <!-- TODO: bg-color depends on order status -->
      <div class="px-3 py-2 flex justify-between rounded-t-lg">
        <div class="flex flex-col justify-between">
          <p class="text-xl">{{new Date(order.timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}}</p>
          <h5 class="text-xl">#{{order.id}}</h5>
        </div>
      <div class="flex flex-col justify-between">
        <div class="flex space-x-2">
          <BanIcon @click="cancelOrder" class="w-6 h-6 cursor-pointer rounded-md shadow"/>
          <CheckIcon @click="prepareOrder" class="h-6 w-6 cursor-pointer rounded-md shadow"/>
          <FlagIcon @click="archiveOrder" class="h-6 w-6 cursor-pointer rounded-md shadow"/>
        </div>
        <h5 class="text-md cursor-pointer text-center px-2 py-1 rounded-md mt-2 shadow" @click="filterByTable(table)">Table: {{(table) ? table.tableNumber : NaN}}</h5>
      </div>
      </div>
      <div class="flex flex-col px-3 pb-2 rounded-b-lg text-white capitalize font-semibold max-h-64">
        <p class="text-gray-200 italic" >{{order.comments}}</p>
        <div v-for="(dish, index) in order.dishes" :key="index">{{dish}}</div>
      </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType} from 'vue'
import store from '@/store'
import { FlagIcon, CheckIcon, BanIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    FlagIcon,
    CheckIcon,
    BanIcon
  },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    },
    table: {
      type: Object as PropType<Table>,
      required: false
    }
  },
  setup(props) {
    let order = props.order
    let isFiltered = false
    const prepareOrder = () => {
      if (props.order.isBeingPrepared) {
        // If order is done being prepared, set isBeingPrepared false and isReady True
        order.isBeingPrepared = false
        order.isReady = true
        store.dispatch('updateOrder', order)     
        console.log('set order done')
      }
      else { 
        // If order is approved, set isBeingPrepared True
        order.isBeingPrepared = true
        store.dispatch('updateOrder', order)     
      }
    }

    const archiveOrder = () => {
      // Set isArchived True
      //order.isArchived = true
      store.dispatch('updateOrder', order) 
    }

    const cancelOrder = () => {
      // Set isCanceled True
      order.isCanceled = true
      store.dispatch('updateOrder', order) 
    }  

    function filterByTable(table: Table) {
      if (isFiltered) {
        store.commit('setFilter', 0)
        isFiltered = false
      } else {
        store.commit('setFilter', table.tableNumber)
        isFiltered = true
      }
    }

    return {
      prepareOrder, cancelOrder, archiveOrder, filterByTable
    }
  }
})
</script>