<template>
  <!-- <Table text="3" isEmpty=true active=false/> -->
  <div class="table-row flex flex-row">
    <div class="col-1">
      <p class="num">Table {{ table.tableNumber }}</p>
      <div v-if="table.inUse" class="status emptyEqualsFalse">In Use</div>
      <div v-else class="status emptyEqualsTrue">Available</div>
    </div>
    <div class="col-2">
      <p v-if="table.isActive">Active</p>
      <p v-else>Inactive</p>
      <button class="toggle">
        <img v-if="table.isActive" src="../../assets/toggle-on.png" />
        <img v-else src="../../assets/toggle-off.png" />
      </button>
    </div>
    <button @click="addToSelectedTables" class="checkbox">
      <img v-if="isSelected" src="../../assets/checkbox-checked.png" />
      <img v-else src="../../assets/checkbox-unchecked.png" />
    </button>
  </div>
</template>


<script lang="ts">
import store from '@/store'
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    table: {
      type: Object as PropType<RestaurantTable>,
      required: true,
    },
    isSelected: {
      type: Object as PropType<Boolean>,
      required: true,
    },
  },
  setup(props) {
    function addToSelectedTables() {
      store.commit('addToSelectedTableIds', props.table.id)
    }
    function removeFromSelectedTables() {
      //store.commit("removeFromSelectedTableIds", props.table.id);
    }
    function toggleTable(id: number) {

    }

    //../assets/checkbox-checked.png
    //../assets/checkbox-unchecked.png
    // const checkboxImg: string = "unchecked"

    onMounted(() => console.log(props.table.tableNumber))
    return {
      addToSelectedTables,
      removeFromSelectedTables,
      toggleTable
    }
  },
})
</script>

<style scoped>
.table-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  max-width: 730px;
  white-space: nowrap;
  min-height: 55px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  margin-bottom: 10px;
}

p {
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 1rem;
  line-height: 29px;
}
.col-1,
.col-2 {
  display: flex;
  padding: 0;
  gap: 10px;
  align-items: center;
}

.status {
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 17px;
}
.emptyEqualsFalse {
  color: #ff0000;
}
.emptyEqualsTrue {
  color: #009142;
}

.checkbox {
  max-width: 35px;
  max-height: 35px;
}

.toggle {
  min-width: 50px;
}
</style>