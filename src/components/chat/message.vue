<template>
  <div class="message">
    <div class="message__box">
      <span class="message__text">
        <slot></slot>
      </span>
      <span class="message__info">
        <span class="message__info__time"> {{ localTime }} </span>
        <v-icon class="message__info__state"> mdi-check-all </v-icon>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  time: Date,
});

const time = new Date(props.time);

const localTime = time.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
</script>

<style lang="scss" scoped>
.message {
  margin: 5px 0;
  display: flex;
}
.message__box {
  display: inline-block;
  max-width: 52%;
  background: var(--color-background-soft);
  border-radius: 5px 20px 20px 5px;
  padding: 10px 10px 10px 8px;
  color: #000;
}
.message__info {
  float: right;
  position: relative;
  bottom: 0;
  transform: translateY(25%);
}
.message__info__time {
  font-size: 0.875rem;
  margin-right: 5px;
  margin-left: 10px;
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
    color: #fff;
  }
  .message__info__state {
    font-size: 0.875rem;
    display: inline-block;
  }
}
</style>
