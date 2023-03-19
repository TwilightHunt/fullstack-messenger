<template>
  <div class="bubble">
    <bubble-item
      v-for="item in items"
      :icon-name="item.iconName"
      :text="item.text"
      :color="item?.color" />
  </div>
</template>

<script setup>
import bubbleItem from "./bubble-item.vue";

defineProps({
  items: Array,
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
}
</style>
