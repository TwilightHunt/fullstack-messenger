<template>
  <div class="menu-link" @click="$emit('action')">
    <div class="menu-link__label" :style="`background-color: ${color};`">
      <v-icon class="menu-link__icon" :size="20">{{ icon }}</v-icon>
    </div>
    <div class="menu-link__text"><slot></slot></div>
    <slider
      class="menu-link__slider"
      v-if="withSlider"
      :checked="checked"
      @onChange="$emit('action')"
    />
  </div>
</template>

<script setup>
import slider from "../UI/slider.vue";
defineProps({
  icon: String,
  color: String,
  withSlider: Boolean,
  checked: Boolean,
});
</script>

<style lang="scss" scoped>
.menu-link {
  display: flex;
  padding: 7px 0;
  align-items: center;
  cursor: pointer;
}
.menu-link__label {
  margin-right: 20px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
}
[rounded] {
  .menu-link__label {
    border-radius: 50%;
  }
}
.menu-link__icon {
  position: relative;
  top: 0;
  left: 0;
  color: #fff;
  transform: translate(25%, 10%);
}
.menu-link__slider {
  margin-left: auto;
}
</style>
