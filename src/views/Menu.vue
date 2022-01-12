<template>
  <div>
    <div v-if="costumerMenuIsOpen || !isAuthenticated">
      <button 
        class="bg-gray-500 rounded-3xl" 
        v-if="isAuthenticated && !loading && user.roles.includes('RestaurantOwner')" 
        @click="toggleMenu">Switch to manager menu
      </button>
      <CustomerMenu />
    </div>
    <div v-else-if="isAuthenticated && !loading && user.roles.includes('RestaurantOwner')">
      <button 
        class="bg-gray-500 rounded-3xl" 
        @click="toggleMenu">Switch to costumer menu
      </button>
      <ManagerMenu class="flex justify-center" />
    </div>
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