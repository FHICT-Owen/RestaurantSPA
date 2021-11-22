<template>
  <div>
    <qrcodescanner />
    <button @click="getToken">REDWADAWD</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Qrcodescanner from '../components/Qrcodescanner.vue'
import { inject } from 'vue'
import { AuthPlugin } from '@/auth'

export default defineComponent({
  components: {
    Qrcodescanner
  },
  setup() {
    const auth = inject<any>('Auth') //TODO: define type for auth
    if (!!auth)
      return {
        getToken: () => console.log(auth.getIdTokenClaims())
      } 
  }
})
</script>


