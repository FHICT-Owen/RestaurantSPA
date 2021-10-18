<template>
 <div class="welcome">
    <div class="welcome-text">
      <h1>Welcome</h1>
      <h3>What would you like to have?</h3>
    </div>
  </div>
<CostumerMenu />
</template>


<script lang="ts">

import CostumerMenu from '../components/CustomerMenu.vue'

export default {
  name: 'Home',
  components: {
    CostumerMenu,
  },
}
</script>


<style>
.welcome {
  position: relative;
  color: white;
  height: 200px;
  background-color: #FFA825;
}
.welcome-text {
  left: 0;
  bottom: 0;
  position: absolute;
  padding: 20px;
}
</style>