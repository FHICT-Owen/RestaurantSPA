<template>
    <div  class="w-64 text-white mb-3" style="max-width: 18rem;">
      <!-- TODO: bg-color depends on order status -->
        <div class="card-header relative flex justify-between" v-if="!order.isArchived" v-bind:class="{ 'bg-primary' : !order.isApproved, 'bg-warning': order.isBeingPrepared, 'bg-danger': order.isCanceled, 'bg-success': order.isReady}">
          <div class="flex flex-col justify-between">
            <p class="text-xl">{{new Date(order.timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}}</p>
            <h5 class="text-xl">#{{order.id}}</h5>
          </div>            
          <div class="flex flex-col justify-between">
            <div class="flex space-x-2">
              <BanIcon @click="cancelOrder" class="w-6 h-6 cursor-pointer rounded-md" style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);"/>
              <CheckIcon @click="prepareOrder" class="h-6 w-6 cursor-pointer rounded-md" style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);"/>
              <FlagIcon @click="archiveOrder" class="h-6 w-6 cursor-pointer rounded-md" style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);"/>
            </div>
            <h5 class="text-xl cursor-pointer px-2 rounded-md" style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);" @click="filterByTable(table)">Table: {{(table) ? table.tableNumber : NaN}}</h5>
          </div>                
        </div>
        <div v-if="!order.isArchived" class="card-body border bg-light text-black overflow-y-auto max-h-64">
          <p class="text-m text-gray-700 my-2" >{{order.comments}}</p>
          <table class="table">
            <tr>
              <li class="list-inside list-none" v-for="(dish, index) in order.dishes" :key="index">{{dish}}</li>
            </tr>
          </table>
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
      required: true
    }
  },
  methods: {
    log(order:any) {
      console.log(order)
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
        console.log(order)
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