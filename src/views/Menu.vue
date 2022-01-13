<template>
  <div>
    <button 
      @click="toggleMenu"
      class="absolute bg-gray-300 rounded-3xl top-52 right-0" 
      v-if="isAuthenticated && !loading && user.roles.includes('RestaurantOwner')">
      {{costumerMenuIsOpen ? 'Switch to manager menu' : 'Switch to costumer menu'}}
    </button>
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