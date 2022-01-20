<template>
  <div>
    <div 
      class="max-w-3xl fixed flex flex-col rounded-3xl p-3 m-4 mt-6 z-50 bottom-0 bg-white" 
      style="transform: translate(0.1vw); width: 92%; box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);">
      
      <div class="flex flex-row justify-between h-7">
        <p class="text-2xl" style="color:#148F00">€{{(totalPrice < 0 ? 0.00 : totalPrice).toFixed(2)}}</p>
        <p>{{orderState}}</p>
        <button class="rounded-lg px-1 text-sm w-16" style="color:#148F00; border: 2px solid;" @click="order"> ORDER </button>
      </div>

      <div class="flex flex-row mt-2">
        <div>
          <textarea class="resize-none mt-1 w-60" style="height: 36px" v-model="comments" rows="1" :placeholder="$t('comments')" />
        </div>
        <div class="ml-auto"> 
          <button :disabled="!showBackButton" :class="{'rounded opacity-50 cursor-not-allowed': !showBackButton}" @click="goToPreviousOrder" class="rounded text-white bg-blue-500 p-1 px-2 ml-auto mx-1">Back</button>
          <button :disabled="!showNextButton" :class="{'rounded opacity-50 cursor-not-allowed': !showNextButton}" @click="goToNextOrder"  class="rounded text-white bg-blue-500 p-1 px-2">Next</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { OrderState } from '@/types'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'

export default defineComponent({
  props: {
    placeOrder: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    let comments = ref('')
    const orderState = computed(() => true ? 'Place your order' : 'idk')
    const totalPrice = computed(() => store.state.totalPrice)

    const showBackButton = computed(() =>
      store.state.sessionOrders.length > 0 && store.state.selectedOrderIndex > 0)
    const showNextButton = computed(() => 
      store.state.sessionOrders.length > 0 && store.state.selectedOrderIndex < store.state.sessionOrders.length)
    
    const goToPreviousOrder = () =>
      store.state.selectedOrderIndex--
    const goToNextOrder = () =>
      store.state.selectedOrderIndex++

    const onInput = (e: any) => {
      e.target.style.height = 'auto'
      e.target.style.height = (e.target.scrollHeight) + 'px'
    }

    const order = () => {
      const currentSession = store.state.currentSession
      if (!!currentSession) {
        store.state.currentOrder.comments = comments.value
        store.state.currentOrder.timeStamp = Date.now()
        store.state.currentOrder.orderState = OrderState.isApproved //TODO: switch back to unApproved after validation is added
        store.state.currentOrder.tableNumber = currentSession.tableNumber
        store.state.currentOrder.sessionId = VueCookieNext.getCookie('sessionId')
        props.placeOrder(store.state.currentOrder)
      }
    }

    onMounted(() => {
      const tx = document.getElementsByTagName('textarea')
      for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;')
        tx[i].addEventListener('input', onInput, false)
      }
    })

    return { 
      comments, 
      orderState,
      totalPrice, 
      showBackButton,
      showNextButton,

      goToPreviousOrder,
      goToNextOrder,

      order, 
      onInput 
    }
  }
})
</script>
