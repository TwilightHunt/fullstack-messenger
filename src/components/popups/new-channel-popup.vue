<template>
  <createPopup input-title="Channel name">
    <v-text-field
      label="Description (optional)"
      variant="underlined"
      color="primary"
      class="new-channel-popup__input"
    ></v-text-field>
  </createPopup>
</template>

<script setup>
import createPopup from "./create-popup.vue";
</script>

<style lang="scss" scoped>
.new-channel-popup__input {
  padding: 0 30px;
}
</style>
