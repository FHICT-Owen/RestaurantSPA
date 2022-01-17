<template>
  <div>
    <input type="text" v-model="url"/>
    <qrcode-vue :value="url" :size=size render-as="svg"></qrcode-vue>
  </div>  
</template>

<script lang="ts">
import QrcodeVue from 'qrcode.vue'
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  components: {
    QrcodeVue,
  },
  setup(){
    const url = ref('')
    const size = ref(300)
    const auth = inject<any>('Auth')
  
    return { ...auth, url, size }
  }
})
</script>