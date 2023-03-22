<template>
  <div class="chat-state">
    <div class="chat-state__title">{{ title }}</div>
    <div class="chat-state__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.chat-state {
  position: relative;
  inset: 0;
  margin: auto;
  background-color: rgb(33, 33, 33, 0.7);
  padding: 15px 20px;
  border-radius: 50px;
  text-align: center;
}
.chat-state__title {
  font-weight: 600;
}
</style>
