<template>
  <div class="food-card">
    <div class="menu-card">
      <div class="menu-image" :style="{ background: dish.image }"></div>
      <div class="menu-title">
        <h5>{{dish.name}}</h5>
      </div>
      <div class="description-frame">
        <p class="menu-description">{{dish.description}}</p>
      </div>
      <div class="plus-icon" @click="openEditDialog"><div class="overlay"></div></div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'

export default ({
  props: {
    dish: {} as Dish
  },
  setup (props: { dish: Dish }) {
    function openEditDialog() {
      store.dispatch('toggleDialog', true)
      store.dispatch('setCurrentDish', props.dish)
    }
    return { openEditDialog}
  }
})
</script>

<style>
@font-face {
  font-family: SF Pro Display;
  src: url("../fonts/SFPRODISPLAYREGULAR.OTF");
}

.food-card {
  position: relative;
  width: 350px;
  height: 100px;
  margin-top: 10px;
}

.menu-card {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: #FFFFFF;
  box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
}

.menu-title {
  position: absolute;
  left: 32%;
  right: 15.14%;
  top: 9%;
  bottom: 71%;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;

  color: #000000;
}

.menu-image {
  position: absolute;
  left: 1.43%;
  right: 72.86%;
  top: 5%;
  bottom: 5%;
  background-size: cover!important;
  mix-blend-mode: normal;
  border-radius: 22px;
}

.description-frame{
  position: absolute;
  left: 32%;
  right: 18%;
  top: 33%;
  bottom: 5%;
}

.menu-description {
  position: absolute;
  width: 175px;
  height: 48px;
  left: 0px;
  top: 0px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;

  color: #9F9F9F;
}

.plus-icon {
  position: absolute;
  left: 85.71%;
  right: 4.29%;
  top: 31%;
  bottom: 34%;

  background: url(../assets/plus.png);
}

.plus-icon:hover > .overlay {
  width:100%;
  height:100%;
  position:absolute;
  background-color:#000;
  opacity:0.1;
  border-radius:30px;
}

li {
  list-style: none;
}

ul {
  margin:0;
  padding:0;
}
</style>
