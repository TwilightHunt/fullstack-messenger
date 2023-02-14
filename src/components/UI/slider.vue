<template>
  <label class="switch">
    <input
      :checked="checked"
      @change="$emit('onChange')"
      type="checkbox"
      class="checkbox"
    />
    <span class="slider"></span>
  </label>
</template>

<script setup>
defineProps({
  checked: Boolean,
});
</script>

<style lang="scss" scoped>
.checkbox {
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + .slider {
    background-color: var(--accent-color);
  }
  &:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
  &:focus + .slider {
    box-shadow: 0 0 1px var(--light-blue-color);
  }
}
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 17px;
  &:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
}
</style>
