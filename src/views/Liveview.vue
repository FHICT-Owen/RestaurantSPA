<template>
    <div class="container">
        <h1 class="text-5xl">Orders</h1>
        <br/>
        <div class="container flex items-start space-x-4">

            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
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