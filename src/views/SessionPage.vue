<template>
  <div class="container-fluid primary-bg">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-sm-12 col-md-8">
        <div class="welcome">
          <div class="welcome-text">
            <h2>Welcome</h2>
            <h5>What would you like to have?</h5>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
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
.primary-bg {
  background-color: #FFA825;
}
.welcome {
  position: relative;
  color: white;
  height: 200px;
}

.welcome-text {
  left: 0;
  bottom: 0;
  position: absolute;
  padding: 20px;
}
</style>