<template>
  <div class="chat-blank">
    <chat-state :title="'Chat is not selected...'" :text="'Select a chat to start the dialog'" />
  </div>
</template>

<script setup>
import chatState from "./chat-state.vue";
</script>

<style lang="scss" scoped>
.chat-blank {
  width: 100%;
  background: var(--chat-bg-img);
  background-size: cover;
  display: flex;
}
</style>
