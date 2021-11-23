<template>
  
    <!-- <Table text="3" isEmpty=true active=false/> -->
    <div class="table-row">
      <div class="col-1">
        <p class="num">Table 1</p>
        <div class="status emptyEqualsFalse">In use</div>
      </div>
      <div class="col-2">
        <p class="active">Active</p>
        <button class="toggle activeEqualsTrue">Toggle</button>
      </div>
      <button class="checkbox">Checkbox</button>
    </div>
</template>


<script lang="ts">
import store from "@/store";
import { computed, ref } from "vue";

export default {
  name: "TableItem",
  components: {},
  setup() {},
};
</script>

<style scoped>


.table-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 730px;
  white-space: nowrap;
  min-height: 70px;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
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
</style>