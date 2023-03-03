<template>
  <popup>
    <div class="list-popup">
      <header class="list-popup__header">
        <div class="list-popup__title">{{ title }}</div>
        <v-icon class="list-popup__header__action">{{ headerAction }}</v-icon>
      </header>
      <div class="list-popup__body">
        <slot></slot>
      </div>
      <footer class="list-popup__footer">
        <button
          class="list-popup__button_positive"
          v-if="positiveButton"
          @click="$emit('positiveAction')"
        >
          {{ positiveButton }}
        </button>
        <button
          class="list-popup__button_negative"
          @click="$emit('negativeAction')"
        >
          {{ negativeButton }}
        </button>
      </footer>
    </div>
  </popup>
</template>

<script setup>
import popup from "./popup.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  headerAction: String,
  negativeButton: {
    type: String,
    default: "Close",
  },
  positiveButton: String,
});
</script>

<style lang="scss" scoped>
@import "../../assets/mixins/action-btn.scss";
.list-popup {
  min-width: 450px;
  height: 730px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list-popup__header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-popup__title {
  font-size: 1.175em;
}
.list-popup__header__action {
  @include action-btn();
}
.list-popup__body {
  margin-bottom: auto;
}
.list-popup__footer {
  padding: 10px 30px;
}
.list-popup__button {
  color: var(--accent-color);
  padding: 5px 20px;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-background-soft-hover);
  }
}
.list-popup__button_negative {
  @extend .list-popup__button;
  float: right;
}
.list-popup__button_positive {
  @extend .list-popup__button;
}
</style>
