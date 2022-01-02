<template>
  <div class="flex flex-row justify-between items-center w-full whitespace-nowrap rounded-2xl px-4 py-2 m-1 shadow">
    <div class="flex flex-row justify-center gap-5">
      <div class="flex items-center gap-2">
        <p class="num">Table {{table.tableNumber}}</p>
        <div 
          class="text-sm w-14"
          :class="table.inUse ? 'text-red-600' : 'text-green-600'">
          {{ table.inUse ? "In Use" : "Available" }}
        </div>
      </div>
      <label class="relative inline-block w-14 h-8 my-auto">
        <input id="slider" type="checkbox" v-model="isActive" @change="toggleTable" hidden />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="flex flex-row gap-2">
      <PrinterButton @click="printQRCode" />
      <DeleteButton @click="removeTable(table)" />
    </div>
    <QrcodeVue
      :id="table.id"
      :value="tableUrl"
      :size="300"
      render-as="svg"
      hidden
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import store from '@/store'
import { Printd } from 'printd'

import QrcodeVue from 'qrcode.vue'
import DeleteButton from '../buttons/DeleteButton.vue'
import PrinterButton from '../buttons/PrinterButton.vue'
import TableDataService from '../../services/TableDataService'
import { Table } from '@/classes'

export default defineComponent({
  components: {
    QrcodeVue,
    DeleteButton,
    PrinterButton,
  },
  props: {
    table: {
      type: Object as PropType<Table>,
      required: true,
    },
  },
  setup(props) {
    const tableUrl = ref(
      `${window.location.origin}/session?tableId=${props.table.id}`
    )
    const printContent = ref()

    function toggleTable() {
      store.dispatch('updateTable', new Table(props.table.id, props.table.tableNumber, props.table.restaurantId, !props.table.isActive, props.table.inUse))
    }

    function printQRCode() {
      const cvs = <HTMLElement>document.getElementById(`${props.table.id}`)
      new Printd().print(cvs)
    }

    function removeTable(table: Table) {
      if (table.inUse) return

      TableDataService.deleteTable(table).then( promise => {
        if (promise) {
          const currentTables = ref(store.state.tables)
          const tableToRemove = currentTables.value.find(target => target.id == table.id) 
          const filteredTables = currentTables.value.filter(function(value, index, arr){ 
            return value != tableToRemove
    	})
          store.state.tables = filteredTables
        }
      })
    }

    return {
      toggleTable,
      printQRCode,
      removeTable,
      printContent,
      isActive: ref(props.table.isActive),
      tableUrl
    }
  },
})
</script>

<style scoped>
/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgba(245, 158, 11);
}

input:focus + .slider {
  box-shadow: 0 0 1px rgba(245, 158, 11);
}

input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
