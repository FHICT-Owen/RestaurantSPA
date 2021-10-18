<template>
  <div>
    <div v-if="costumerMenuIsOpen || !isAuthenticated">
      <button v-show="isAuthenticated && !loading" @click="toggleMenu">Switch to manager menu</button>
      <CostumerMenu />
    </div>
    <div v-else-if="isAuthenticated && !loading">
      <button @click="toggleMenu">Switch to costumer menu</button>
      <ManagerMenu />
    </div>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
import CostumerMenu from '../components/CustomerMenu.vue'
import ManagerMenu from '../components/ManagerMenu.vue'

export default {
  components: {
    CostumerMenu,
    ManagerMenu
  },
  setup() {
    const auth = inject<any>('Auth') //TODO: define type for auth
    let costumerMenuIsOpen = ref(false)

    const toggleMenu = () => costumerMenuIsOpen.value = !costumerMenuIsOpen.value

    return { ...auth, costumerMenuIsOpen, toggleMenu }
  }
}
</script>
