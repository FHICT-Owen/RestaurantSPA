<template>
  <div class="TablePlan">
    Table Plan

    <div class="buttons-container">
      <button v-on:click="true">Add Table</button>
      <button v-on:click="true">Delete Selected</button>
    </div>
    <div class="table-container">
      <!-- <table-item v-for='table in tables' :key='table.id'/> -->
      <div v-for="table in tables" :key="table.id">
        <TableItem :table="table" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import TableItem from "../components/TableItem.vue";
import store from "@/store";

export default {
  name: "TablePlan",
  components: {
    TableItem,
  },
  setup() {
    const tables = computed(() => store.state.tables);
  },
};
</script>

<style scoped>
.table-container {
  background: #ffffff;
  box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  height: 120vh;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.TablePlan {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  background: var(--primary-color);
  font-family: SF Pro Display;
  font-style: normal;
  padding: 10px;
}
.buttons-container {
  align-self: flex-end;
}
</style>


