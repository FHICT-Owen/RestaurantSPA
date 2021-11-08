<template>
  <div>
    <div class="flex flex-col text-white h-48 relative p-6" style="background-color: #FFA825">
      <ShoppingCartIcon class="self-end" />
      <div class="text-4xl w-4/5">Welcome</div>
      <div class="text-3xl w-4/5">What would you like to have?</div>
    </div>
    <CostumerMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { ShoppingCartIcon } from '@heroicons/vue/outline'
import CostumerMenu from '../components/CustomerMenu.vue'

export default defineComponent({
  components: { CostumerMenu, ShoppingCartIcon }
})
</script>