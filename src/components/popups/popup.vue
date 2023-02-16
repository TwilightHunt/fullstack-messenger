<template>
  <div class="popup">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.popup {
  background-color: var(--color-background-mute);
  border-radius: 20px;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
