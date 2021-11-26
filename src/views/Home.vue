<template>
  <div>
    <qrcodescanner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Qrcodescanner from '../components/Qrcodescanner.vue'

export default defineComponent({
  components: {
    Qrcodescanner
  }
})
</script>


