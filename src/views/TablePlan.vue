<template>
  <div class="flex justify-center">
    <div class="flex flex-col w-full max-w-3xl">
      <button 
        class="inline-block border border-yellow-500 rounded-xl m-2 py-1 px-3 bg-yellow-500 text-white no-underline" 
        v-on:click="addTable">Add Table
      </button>
      <div 
        class="flex flex-col items-center p-2 rounded-2xl bg-white" 
        style="box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);">
        <TableCard v-for="table in tables" :table="table" :key="table.id" />
      </div>
    </div>
		<TableDialog v-if="isTableDialogOpen" :key="isTableDialogOpen" />
  </div>
	
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import TableCard from '../components/cards/TableCard.vue'
import TableDialog from '../components/dialogs/TableDialog.vue'
import store from '@/store'

export default {
  name: 'TablePlan',
  components: {
    TableCard,
    TableDialog
  },
  setup() {
    const isTableDialogOpen = computed(() => store.state.isTableDialogOpen)
    const tables = computed(() => store.state.tables)
    const selectedTableIds = computed(() => store.state.selectedTableIds)

    function addTable() {
      store.commit('toggleTableDialog')
    }

    function isSelected(id: number) {
      return selectedTableIds.value.indexOf(id) != -1
    }
    onMounted(() => {
      store.commit('setTables')
    })

    return {
      tables,
      isSelected,
      addTable,
      isTableDialogOpen
    }
  },
}
</script>

<style scoped>
.buttons {
  width: 130px;
  height: 40px;

  background: #ffa825;
  border: 2.5px solid #ffffff;
  box-sizing: border-box;
  border-radius: 7px;

  /* font-family: SF Pro Display; */
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #ffffff;
}
</style>
