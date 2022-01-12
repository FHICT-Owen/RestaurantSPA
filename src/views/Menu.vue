<template>
  <div>
    <div v-if="costumerMenuIsOpen || !isAuthenticated">
      <button class="flex" v-if="isAuthenticated && !loading" @click="toggleMenu">Switch to manager menu</button>
      <CustomerMenu />
    </div>
    <div v-else-if="isAuthenticated && !loading">
      <button @click="toggleMenu">Switch to costumer menu</button>
      <ManagerMenu class="flex justify-center" />
    </div>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
import CustomerMenu from '../components/CustomerMenu.vue'
import ManagerMenu from '../components/ManagerMenu.vue'
import { AuthPlugin } from '@/auth'

export default {
  components: {
    CustomerMenu,
    ManagerMenu
  },
  setup() {
    const auth = inject<AuthPlugin>('Auth')
    let costumerMenuIsOpen = ref(false)

    const toggleMenu = () => costumerMenuIsOpen.value = !costumerMenuIsOpen.value

    return { ...auth, costumerMenuIsOpen, toggleMenu }
  }
}
</script>
