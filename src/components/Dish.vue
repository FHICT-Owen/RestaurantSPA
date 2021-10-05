<template>
  <div className="food-card">
    <div className="menu-card">
      <div className="menu-image" :style="{ 'background-image': image }"></div>
      <div className="menu-title">
        <h5>{{dish.name}}</h5>
      </div>
      <div className="description-frame">
        <p className="menu-description">{{dish.description}}</p>
      </div>
      <div className="plus-icon"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { convertNumberArrayToImageUrl } from '../utils'

export default ({
  props: {
    dish: {} as Dish
  },
  setup(props: { dish: Dish }) {
    const image = convertNumberArrayToImageUrl(props.dish.image)
    return { image }
  }
})
</script>
