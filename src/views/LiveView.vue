<template>
    <div v-if="isAuthenticated && !loading" class="container">
				<div class="flex content-end">
						<ul class="flex my-5">
								<li class="mr-3">
										<a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">All</a>
								</li>
								<li class="mr-3">
										<a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">Done</a>
								</li>
								<li class="mr-3">
										<a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">Preparing</a>
								</li>
								<li class="mr-3">
										<a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline" href="#">New</a>
								</li>
								<li class="mr-3">
										<a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white no-underline " href="#">Archive</a>
								</li>
						</ul>
				</div>
				<div class="container flex flex-wrap items-start">
						<div v-for="(order, index) in orders" :key="index">
									<OrderCard :order="order" class="mx-4"/>
						</div>
				</div>
    </div>

</template>

<script lang="ts">
import { inject, computed, defineComponent, onMounted } from 'vue'
import OrderCard from '../components/OrderCard.vue'
import store from '@/store'
import { AuthPlugin } from '@/auth'


export default defineComponent({
  components: {
    OrderCard
  },
  setup() {
    const auth = inject<AuthPlugin>('Auth')
    const orders = computed(() => store.state.orders)

    onMounted(() => {
      store.commit('setOrders')
    })

    return {
      ...auth, orders 
    }
  }

})
</script>