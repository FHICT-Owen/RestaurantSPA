<template>
  <div>
    <hero />
    <hr />
    <home-content />
  </div>
</template>

<script lang="ts">
import Hero from "../components/Hero.vue";
import HomeContent from "../components/HomeContent.vue";

export default {
  name: "Home",
  components: {
    Hero,
    HomeContent
  }
}
</script>

<style lang="scss" scoped>
.next-steps {
  .fa-link {
    margin-right: 5px;
  }
}
</style>
