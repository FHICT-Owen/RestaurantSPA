<template>
  <div :id="data.text" class="text-white opacity-90 text-xl font-medium rounded-md p-2 shadow">
    {{data.text}}
  </div>
</template>

<script lang="ts">
import { PopUp } from '@/types'
import { defineComponent, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    popUp: {
      type: Object as PropType<PopUp>,
      required: true,
    }
  },
  setup(props) {
    onMounted(() => {
      const popUp = document.getElementById(`${props.popUp.text}`)
      if (!!popUp) props.popUp.isError 
        ? popUp.style.backgroundColor = 'red' : popUp.style.backgroundColor = 'green'
    })
    return { data: ref(props.popUp) }
  },
})
</script>
