<template>
  <div>
    <div class="flex flex-row justify-center bg-yellow-500 p-2 py-2">

      <button 
        @click="toggleMenu"
        class="text-white top-52 py-2 px-4 right-0" 
        v-if="isAuthenticated && !loading && user.roles.includes('RestaurantOwner')">
        {{costumerMenuIsOpen ? 'Switch to Manager menu' : 'Switch to Customer Menu'}}
      </button>
    </div>
      <CustomerMenu 
        v-if="costumerMenuIsOpen || !isAuthenticated"/>
      <ManagerMenu 
        class="flex justify-center"
        v-else-if="isAuthenticated && !loading && user.roles.includes('RestaurantOwner')"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import CustomerMenu from '../components/CustomerMenu.vue'
import ManagerMenu from '../components/ManagerMenu.vue'
import { AuthPlugin } from '@/auth'

export default defineComponent({
  components: {
    CustomerMenu,
    ManagerMenu
  },
  setup() {
    const auth = inject<AuthPlugin>('Auth')
    let costumerMenuIsOpen = ref(true)

    const toggleMenu = () => costumerMenuIsOpen.value = !costumerMenuIsOpen.value

    return { 
      ...auth, 
      costumerMenuIsOpen, 
      toggleMenu 
    }
  }
})
</script>