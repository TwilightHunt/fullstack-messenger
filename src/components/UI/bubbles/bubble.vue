<template>
  <div class="bubble" :style="`top:${top}; left: ${left};`">
    <bubble-item v-for="item in items" :info="item" />
  </div>
</template>

<script setup>
import bubbleItem from "./bubble-item.vue";

defineProps({
  items: Array,
  top: String,
  left: String,
});
</script>

<style lang="scss" scoped>
.bubble {
  background-color: rgb(33, 33, 33);
  position: absolute;
  z-index: 10;
  border-radius: 20px;
  overflow-x: hidden;
  padding: 5px 3px;
}
[blurred] {
  background-color: rgb(33, 33, 33, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.5);
}
</style>
