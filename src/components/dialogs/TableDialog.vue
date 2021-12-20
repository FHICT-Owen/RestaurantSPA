<template>
  <DialogBackground :close="closeDialog">
    <dialog 
      class="flex rounded-3xl p-2 z-50 top-1/2" 
      style="transform: translateY(-50%); box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.25);">
      <div class="flex flex-col w-80">
				
        <div class="flex flex-row justify-evenly mt-2">
					<input type="number" min="1" step="1" v-model="tableName"/>
          <button
            class="text-yellow-400 rounded-3xl px-3 py-1 border-2 border-yellow-400 hover:bg-gray-100" 
            @click="createTable">
              Create
          </button>
        </div>
      </div>
    </dialog>
  </DialogBackground>
</template>

tableNumber: number
restaurantId: number

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Table } from '@/classes'
import store from '@/store'
import DialogBackground from './DialogBackground.vue'

export default defineComponent({
  components: {
    DialogBackground,
  },
  setup() {
    let tableName = ref(1) // should be changed to string in the future

    const createTable = () => {
      store.dispatch('createNewTable', new Table(0,tableName.value,1,false,false))
      closeDialog()
    }

    const closeDialog = () => store.state.isTableDialogOpen = false

    return {
      tableName,
      createTable,
      closeDialog,
    }
  }
})
</script>

<style scoped>
  .selected {
    background-color: rgba(251, 191, 36);
    color: white;
  }
  .unselected {
    background-color: white;
    color: rgba(251, 191, 36);
  }
</style>