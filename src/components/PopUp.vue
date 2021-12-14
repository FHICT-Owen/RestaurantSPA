<template>
  <div :id="data.text" class="text-xl bg-opacity-20 bg-gray-200 rounded p-2">
    {{data.text}}
  </div>
</template>

<script lang="ts">
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
        ? popUp.style.color = 'red' : popUp.style.color = 'green'
    })
    return { data: ref(props.popUp) }
  },
})
</script>
