<template>
    <div  class="w-64 text-white mb-3" style="max-width: 18rem;">
        <!-- TODO: bg-color depends on order status -->
            <!-- New order -->
            <div v-if="order.isApproved && !order.isBeingPrepared && !order.isReady" class="card-header bg-primary relative">
                <p class="text-xl">00:00</p>
                <h5 class="text-xl">#{{order.id}}</h5>
                <div class="absolute inset-y-3 right-5 flex space-x-2">
                    <ReplyIcon class="w-6 h-6" />
                    <BanIcon class="w-6 h-6" />
                    <CheckIcon class="h-6 w-6" />
                    <FlagIcon class="h-6 w-6" />
                </div>
            </div>
            <!-- Preparing order -->
            <div v-else-if="order.isBeingPrepared" class="card-header bg-warning relative">
                <p class="text-xl">00:00</p>
                <h5 class="text-xl">#{{order.id}}</h5>
                <div class="absolute inset-y-3 right-5 flex space-x-2">
                    <ReplyIcon class="w-6 h-6" />
                    <BanIcon class="w-6 h-6" />
                    <CheckIcon class="h-6 w-6" />
                    <FlagIcon class="h-6 w-6" />
                </div>
            </div>
            <!-- Completed order -->
            <div v-else-if="order.isReady" class="card-header bg-success relative">
                <p class="text-xl">00:00</p>
                <h5 class="text-xl">#{{order.id}}</h5>
                <div class="absolute inset-y-3 right-5 flex space-x-2">
                    <ReplyIcon class="w-6 h-6" />
                    <BanIcon class="w-6 h-6" />
                    <CheckIcon class="h-6 w-6" />
                    <FlagIcon class="h-6 w-6" />
                </div>
            </div>
            <!-- Canceled order -->
            <div v-else-if="order.isCanceled" class="card-header bg-danger relative">
                <p class="text-xl">00:00</p>
                <h5 class="text-xl">#{{order.id}}</h5>
                <div class="absolute inset-y-3 right-5 flex space-x-2">
                    <ReplyIcon class="w-6 h-6" />
                    <BanIcon class="w-6 h-6" />
                    <CheckIcon class="h-6 w-6" />
                    <FlagIcon class="h-6 w-6" />
                </div>
            </div>
            <!-- Non approved order -->

            <div v-else>

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
import { computed, defineComponent, PropType} from 'vue'
import store from '@/store'
import { FlagIcon, CheckIcon, BanIcon, ReplyIcon } from '@heroicons/vue/solid'


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
  methods: {
    log(order:any) {
      console.log(order)
    }
  },
  setup(props) {
    return {
    }
  }
})
</script>