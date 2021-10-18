<template>
  <div>
    <q-btn @click="prompt = true"></q-btn>
    <!-- <qrcodescanner /> -->
    
    <q-dialog v-model="prompt"><q-card>sadsadsa</q-card></q-dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
// import Qrcodescanner from '../components/Qrcodescanner.vue'

export default {
  name: 'Home',
  components: {
    // Qrcodescanner
  },
  setup() {
    return { prompt: ref(true) }
  }
}
</script>
