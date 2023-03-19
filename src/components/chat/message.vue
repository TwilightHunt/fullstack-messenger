<template>
  <div class="message" @contextmenu.prevent="activateMenu">
    <div class="message__box">
      <span class="message__text">
        <slot></slot>
      </span>
      <span class="message__info">
        <span class="message__info__time"> {{ localTime }} </span>
        <v-icon class="message__info__state"> mdi-check-all </v-icon>
      </span>
    </div>
    <bubble
      v-if="bubbleIsActive"
      :class="`message__bubble ${invertedX ? '_invertedByX' : ''} ${
        invertedY ? '_invertedByY' : ''
      }`"
      :items="messageArray"
      :top="`${bubbleTop}px`"
      :left="`${bubbleLeft}px`"
      blurred />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatTime } from "../../composables/useDate.js";
import bubble from "../UI/bubbles/bubble.vue";
import { setBubbleListeners, messageArray } from "../../composables/useBubble.js";

const props = defineProps({
  time: String,
});

const bubbleIsActive = ref(false);
const invertedX = ref();
const invertedY = ref();
const bubbleTop = ref();
const bubbleLeft = ref();

const localTime = formatTime(props.time);

const activateMenu = (e) => {
  if (e.target.classList[0].includes("bubble-item")) {
    return;
  }

  bubbleIsActive.value = true;

  bubbleTop.value = e.clientY + 10;
  bubbleLeft.value = e.clientX + 10;

  setBubbleListeners(() => {
    bubbleIsActive.value = false;
  });

  invertedY.value = !!(screen.height / 2 - e.clientY < 0);
  invertedX.value = !!(screen.width / 2 - e.clientX < 0);
};
</script>

<style lang="scss" scoped>
.message {
  padding: 2.5px 0;
  display: flex;
}
.message__box {
  display: inline-block;
  max-width: 52%;
  background: var(--color-background-soft);
  border-radius: 5px 20px 20px 5px;
  padding: 10px 10px 10px 8px;
  color: #fff;
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
.message__bubble {
  --translateX: 0;
  --translateY: 0;
  transform: translate(var(--translateX), var(--translateY));
  &._invertedByX {
    --translateX: -100%;
  }
  &._invertedByY {
    --translateY: -100%;
  }
}

[mine="true"] {
  .message__box {
    background: var(--accent-color);
    margin-left: auto;
    border-radius: 20px 5px 5px 20px;
    padding: 10px;
  }
  .message__info__state {
    font-size: 0.875rem;
    display: inline-block;
  }
}
</style>
