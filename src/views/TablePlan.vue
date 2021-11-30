<template>
  <div class="TablePlan">
    <div class="buttons-container">
      <p class="btnwrap">
        <button class="buttons" v-on:click="true">Add Table</button>
      </p>

      <p class="btnwrap">
        <button class="buttons" v-on:click="true">Delete Selected</button>
      </p>
    </div>
    <div class="table-container">
      <!-- <table-item v-for='table in tables' :key='table.id'/> -->
      <TableItem
        v-for="table in tables"
        :table="table"
        :isSelected="isSelected(id)"
        :key="table.id"
      />
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
    const selectedTableIds = computed(() => store.state.selectedTableIds);
    // const selectTable(id: number) => {

    // }

    function addTable() {
      // store.commit()
    }

    function deleteTables(ids: number[]) {}
    function isSelected(id: number) {
      return selectedTableIds.value.indexOf(id) != -1;
    }
    onMounted(() => {
      store.commit("setTables");
      console.log(tables.value);
    });

    return {
      tables,
      isSelected,
      deleteTables,
      addTable,
    };
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
  align-content: center;
  max-width: 750px;
  font-family: SF Pro Display;
  font-style: normal;
  padding: 10px;
}
.buttons-container {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  text-align: center;
}

.btnwrap {
  text-align: center;
}

.buttons {
  width: 130px;
  height: 40px;

  background: #ffa825;
  border: 2.5px solid #ffffff;
  box-sizing: border-box;
  border-radius: 7px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #ffffff;
}
</style>


