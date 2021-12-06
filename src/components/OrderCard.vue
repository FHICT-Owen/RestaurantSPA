<template>
    <div  class="w-64 text-white mb-3" style="max-width: 18rem;">
          <!-- TODO: bg-color depends on order status -->
            <div class="card-header relative" v-bind:class="{ 'bg-primary' : order.isApproved, 'bg-warning': order.isBeingPrepared, 'bg-danger': order.isCanceled, 'bg-success': order.isReady}">
                <p class="text-xl">{{new Date(order.timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}}</p>
                <h5 class="text-xl">#{{order.id}}</h5>
                <div class="absolute inset-y-3 right-5 flex space-x-2">
                    <BanIcon @click="cancelOrder" class="w-6 h-6 cursor-pointer" />
                    <CheckIcon @click="prepareOrder" class="h-6 w-6 cursor-pointer" />
                    <FlagIcon @click="archiveOrder" class="h-6 w-6 cursor-pointer" />
                </div>
            </div>
            <div v-if="order.isApproved || order.isCanceled" class="card-body border bg-light text-black overflow-y-auto max-h-64">
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
    }
  },
  // weghalen na gebruik
  methods: {
    log(order:any) {
      console.log(order)
    }
  },
  setup(props) {
    const order = ref(props.order)
    const prepareOrder = () => {
      if (props.order.isBeingPrepared) {
        // If order is done being prepared, set isReady True
        props.order.isReady == true

        console.log('klikkie1')
      }
      else { 
        // If order is approved, set isBeingPrepared True

        console.log('klikkie2')
      }
    }

    const cancelOrder = (order:any) => {
      order.isCanceled == true
    }    

    const archiveOrder = (order:any) => {
      order.isArchived == true
    }    
    return {
      prepareOrder, cancelOrder, archiveOrder
    }
  }
})
</script>