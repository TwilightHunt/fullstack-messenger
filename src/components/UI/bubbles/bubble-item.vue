<template>
  <div class="bubble-item" :style="`--item-color: ${info.color}`">
    <div class="bubble-item__br" v-if="info.divided"></div>
    <div class="bubble-item__body">
      <v-icon :size="20" class="bubble-item__icon">
        {{ info.iconName }}
      </v-icon>
      <div class="bubble-item__text">{{ info.text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  info: Object,
  isOpened: Boolean,
});
</script>

<style lang="scss" scoped>
.bubble-item {
  min-width: 200px;
}
.bubble-item__br {
  height: 1px;
  background-color: var(--color-text);
  opacity: 0.3;
  margin: 5px 15px;
}
.bubble-item__body {
  display: flex;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(7, 7, 7, 0.7);
  }
}
.bubble-item__icon {
  margin-right: 20px;
  opacity: 0.7;
  color: var(--item-color);
}
.bubble-item__text {
  font-size: 0.875em;
  font-weight: 700;
  color: var(--item-color);
}
</style>
