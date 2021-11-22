<template>
    <div class="container">
        <h1 class="text-5xl">Orders</h1>

  <div >
    <ul class="mr-auto mx-4">
        <button class="mx-2 btn bg-blue-500 text-white rounded w-auto">All</button>
        <button class="mx-2 btn bg-blue-500 text-white rounded w-auto">Done</button>
        <button class="mx-2 btn bg-blue-500 text-white rounded">Preparing</button>
        <button class="mx-2 btn bg-blue-500 text-white rounded">Archive</button>
    </ul>
  </div>
        <div class="container flex flex-wrap items-start">
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
            <OrderCard class="mx-4" />
        </div>
    </div>

</template>

<script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import OrderCard from '../components/OrderCard.vue'

    export default defineComponent({
        components: {
            OrderCard
        }
    })
</script>