<template>
  <Menu/>
</template>

<script lang="ts">
import Menu from '../components/Menu.vue'
import { computed, ref } from 'vue'
import store from '@/store'


export default {
  name: 'Home',
  components: {
    Menu,
  },
}

</script>
