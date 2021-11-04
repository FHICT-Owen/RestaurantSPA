<template>
  <div class="fixed w-full h-full left-0 top-0">
    <div class="absolute left-0 top-0 w-full h-full bg-gray-800 bg-opacity-60 cursor-pointer" @click="closeDialog"></div>
    <slot></slot>
  </div>
</template>