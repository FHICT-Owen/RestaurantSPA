<template>
  <qrcode-vue :value="value" :size="size" level="H" />
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'QR',
  data() {
    return {
      value: 'https://localhost:3000/menu',
      size: 300,
    }
  },
  components: {
    QrcodeVue,
  },
}
</script>