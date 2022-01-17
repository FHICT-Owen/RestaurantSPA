<template>
<div class="flex flex-col justify-center items-center">
<div class="sample-heading my-12">
  <span class="heading"></span>
    <qrcodescanner />
</div>

<div class="rounded-2xl bg-gray-100 p-4 text-center w-3/5">
  <p class="text-xl font-semibold">Scan QR Code</p>
  <p>Please allow app to access camera.</p>
  <!-- Please center QR Code on screen -->
</div>
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

<style scoped>

.sample-heading {
  padding: 1em;
  border: 0.25em solid;
  position: relative;
  width: 300px;
  height: 300px;
}
.sample-heading::before, .sample-heading::after {
  content: "";
  display: block;
  position: absolute;
  background: #F9FAFB;
}
.sample-heading::before {
  top: -0.3em;
  bottom: -0.3em;
  left: 1em;
  right: 1em;
}
.sample-heading::after {
  left: -0.3em;
  right: -0.3em;
  top: 1em;
  bottom: 1em;
}
.sample-heading .heading {
  position: relative;
  z-index: 1;
}

</style>
