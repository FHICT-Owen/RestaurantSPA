<template>
  <div>
    <div 
      class="fixed flex flex-col rounded-3xl p-3 m-4 mt-6 z-50 bottom-0 bg-white" 
      style="transform: translate(0.1vw); width: 92%; box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);">
      <div class="flex flex-row justify-between h-7">
        <p class="text-2xl" style="color:#148F00">€{{(total < 0 ? 0.00 : total).toFixed(2)}}</p>
        <p>{{$t('preparing')}}</p>
        <button class="rounded-lg px-1 text-sm w-16" style="color:#148F00; border: 2px solid;" @click="order"> ORDER </button>
      </div>
      <div class="flex-row">
        <textarea class="resize-none mt-1" style="height: 24px" v-model="comments" rows="1" :placeholder="$t('comments')" />
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
    const total = computed(() => store.state.totalPrice)
    let comments = ref('')

    const onInput = (e: any) => {
      e.target.style.height = 'auto'
      e.target.style.height = (e.target.scrollHeight) + 'px'
    }

    const order = () => {
      const x = store.state.currentSession
      if (!!x) {
        store.state.currentOrder.comments = comments.value
        store.state.currentOrder.timeStamp = Date.now()
        store.state.currentOrder.orderState = OrderState.isApproved //TODO: switch back to unApproved after validation is added
        store.state.currentOrder.tableNumber = x.tableId
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

    return { comments, total, order, onInput }
  }
})
</script>
