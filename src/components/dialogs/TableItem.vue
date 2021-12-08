<template>
  <!-- <Table text="3" isEmpty=true active=false/> -->
  <div
    class="
      flex flex-row
      justify-between
      items-center
      max-w-3xl
      whitespace-nowrap
      rounded-2xl
      px-4
      py-2
      m-1
      shadow
    "
    style=""
  >
    <div class="flex items-center gap-2 w-full">
      <p class="num">Table {{ table.tableNumber }}</p>
      <div v-if="table.inUse" class="status emptyEqualsFalse">In Use</div>
      <div v-else class="status emptyEqualsTrue">Available</div>
    </div>
    <div class="flex items-center gap-2 w-full">
      <label class=" switch">
        <input id="slider" type="checkbox" />
        <span class="slider round "></span>
      </label>
      <!-- <button class="w-12">
        <img v-if="table.isActive" src="../../assets/toggle-on.png" />
        <img v-else src="../../assets/toggle-off.png" />
      </button> -->
     <label for="toggle" class=" text-gray-700">{{
        table.isActive ? "Active" : "Inactive"
      }}</label> 
    </div>
    <label @click="true">
      <input type="checkbox" />
      <!-- <span class="slider round"></span> -->
    </label>
  </div>
  
</template>


<script lang="ts">
import store from "@/store";
import { computed, defineComponent, onMounted, PropType, ref } from "vue";

export default defineComponent({
  props: {
    table: {
      type: Object as PropType<Table>,
      required: true,
    },
    isSelected: {
      type: Object as PropType<Boolean>,
      required: true,
    },
  },
  setup(props) {
    function addToSelectedTables() {
      store.commit("addToSelectedTableIds", props.table.id);
    }
    function removeFromSelectedTables() {
      //store.commit("removeFromSelectedTableIds", props.table.id);
    }
    function toggleTable(id: number) {}

    //../assets/checkbox-checked.png
    //../assets/checkbox-unchecked.png
    // const checkboxImg: string = "unchecked"

    onMounted(() => {
      console.log(props.table.tableNumber) }
    );
    return {
      addToSelectedTables,
      removeFromSelectedTables,
      toggleTable,
    };
  },
});
</script>

<style scoped>
 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

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
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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

</style>