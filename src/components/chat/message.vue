<template>
  <div class="message">
    <div class="message__box">
      <div class="message__text">
        <slot></slot>
      </div>
      <span class="message__info">
        <span class="message__info__time"> 0:53 </span>
        <v-icon class="message__info__state"> mdi-check-all </v-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.message {
  margin: 5px 0;
  display: flex;
}
.message__box {
  display: inline-block;
  max-width: 50%;
  background: var(--color-background-soft);
  border-radius: 5px 20px 20px 5px;
  padding: 10px 10px 10px 8px;
}
.message__info {
  float: right;
}
.message__info__time {
  font-size: 0.875rem;
  margin-right: 5px;
  opacity: 0.7;
}
.message__info__state {
  display: none;
}
[mine] {
  .message__box {
    background: var(--accent-color);
    margin-left: auto;
    border-radius: 20px 5px 5px 20px;
    padding: 10px;
  }
  .message__info__state {
    font-size: 0.875rem;
    display: inline-block;
    color: #fff;
  }
}
</style>
