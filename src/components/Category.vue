<template>
  <div className="food-card">
    <div className="menu-card">
        <div className="menu-title">
          <h5>{{category.name}}</h5>
        </div>
      <div className="plus-icon"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default ({
  props: {
    category: {} as Category
  }
})
</script>
