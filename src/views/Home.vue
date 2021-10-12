<template>
  <div>
    <hero />
    <hr />
    <qrcodescanner />
    <Menu />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import Menu from '../components/Menu.vue'
import Qrcodescanner from '../components/Qrcodescanner.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Menu,
    Qrcodescanner
  }
}
</script>
