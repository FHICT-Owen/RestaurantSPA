<template>
    <div  class="w-64 text-white mb-3" style="max-width: 18rem;">
      <!-- TODO: bg-color depends on order status -->
        <div class="card-header relative flex justify-between" v-bind:class="{ 'bg-primary' : !order.isApproved, 'bg-warning': order.isBeingPrepared, 'bg-danger': order.isCanceled, 'bg-success': order.isReady}">
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
            <h5 class="text-xl cursor-pointer px-2 rounded-md" style="box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);" @click="filterByTable(table)">Table: {{table.tableNumber}}</h5>
          </div>                
        </div>
        <div class="card-body border bg-light text-black overflow-y-auto max-h-64">
          <p class="text-m text-gray-700 my-2" >{{order.comments}}</p>
          <table class="table">
            <tr>
              <td v-for="(dish, index) in order.dishes" :key="index">{{dish}}</td>
            </tr>
          </table>
        </div>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, PropType, ref} from 'vue'
import store from '@/store'
import { FlagIcon, CheckIcon, BanIcon, ReplyIcon } from '@heroicons/vue/solid'


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
  // weghalen na gebruik
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

    const cancelOrder = (order:any) => {
      order.isCanceled == true
    }    

    const archiveOrder = (order:any) => {
      order.isArchived == true
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