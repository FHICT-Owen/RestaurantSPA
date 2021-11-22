<template>
  <div class="TablePlan">
    Table Plan

    <div class="buttons-container">
      <button v-on:click="true">Add Table</button>
      <button v-on:click="true">Delete Selected</button>
    </div>
<div class="table-container">
	<table-item/>
</div>
    </div>
</template>

<script lang="ts">
import TableItem from '../components/TableItem.vue'

export default {
  name: 'TablePlan',
  components: {
    TableItem,
  },
}
</script>

<style scoped>

.table-container {
  background: #ffffff;
  box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  height: 120vh;
  overflow: hidden;
  padding: 10px;
}

.TablePlan {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  background: var(--primary-color);
  font-family: SF Pro Display;
  font-style: normal;
}
.buttons-container {
  align-self: flex-end;
}

</style>


