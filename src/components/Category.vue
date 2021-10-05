
<template>
    <div className="food-card">
      <div className="menu-card">
          <div className="menu-title">
            <h5>{{categories.name}}</h5>
          </div>
        <div className="plus-icon"></div>
      </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"

export default ({
    setup() {
        const category = ref<Category>({id:0, name:""})   
        return category;
    },
})
</script>
