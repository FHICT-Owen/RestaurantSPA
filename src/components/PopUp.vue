<template>
  <div :id="data.text" class="popup">
    {{data.text}}
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'

export default ({
  props: {
    popUp: {} as PopUp
  },
  setup(props: {popUp: PopUp}) {
    let data = ref(props.popUp)
    onMounted(() => {
      const c = document.getElementById(`${data.value.text}`)
      if (!!c) {
        if (data.value.isError) c.style.color = 'red'
        else c.style.color = 'green'
      }
    })
    return { data }
  },
})
</script>

<style>
/* 
  refactor so that not your not using onMounted but set the color before the component has renderd
*/
</style>
