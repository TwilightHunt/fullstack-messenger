<template>
  <div class="bubble-item">
    <div class="bubble-item__body">
      <v-icon :size="20" class="bubble-item__icon">
        {{ iconName }}
      </v-icon>
      <div class="bubble-item__text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  iconName: String,
  text: String,
  color: String,
  isOpened: Boolean,
});
</script>

<style lang="scss" scoped>
.bubble-item {
  min-width: 200px;
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
}
.bubble-item__text {
  font-size: 0.875em;
  font-weight: 700;
}
</style>
