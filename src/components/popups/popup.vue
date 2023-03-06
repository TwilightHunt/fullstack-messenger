<template>
  <div class="popup" v-click-outside="closePopup">
    <slot></slot>
  </div>
</template>

<script setup>
import usePopups from "../../composables/usePopups";

const { setActivePopup } = usePopups();

const closePopup = () => {
  setActivePopup("");
};
</script>

<style lang="scss" scoped>
.popup {
  background-color: var(--color-background-mute);
  border-radius: 20px;
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 15;
  transform: translate(50%, -50%);
  overflow-x: hidden;
}
</style>
