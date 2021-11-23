<template>
  
    <!-- <Table text="3" isEmpty=true active=false/> -->
    <div class="table-row">
      <div class="col-1">
          <p class="num">Table {{table.title}}</p>
        <div class="status emptyEqualsFalse">In use</div>
      </div>
      <div class="col-2">
        <p class="active">Active</p>
        <button class="toggle activeEqualsTrue"><img src="../assets/toggle-on.png"/></button>
      </div>
      <button class="checkbox"><img src="../assets/checkbox-checked.png"/></button>
    </div>
</template>


<script lang="ts">
import store from '@/store'
import { computed, ref } from 'vue'

export default {
  props: {
    title: String,
    isActive: Boolean,
    // table: {} as RestaurantTable
  },
  setup(props: { table: RestaurantTable }) {
    //../assets/checkbox-checked.png
    //../assets/checkbox-unchecked.png
    // const checkboxImg: string = "unchecked"
  },
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