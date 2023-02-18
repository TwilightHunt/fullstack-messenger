<template>
  <popup>
    <div class="create-popup">
      <div class="create-popup__body">
        <fileUpload />
        <v-text-field
          :label="inputTitle"
          variant="underlined"
          color="primary"
          class="create-popup__input"
        ></v-text-field>
      </div>
      <slot></slot>
      <footer class="create-popup__footer">
        <div class="create-popup__footer__buttons">
          <button
            class="create-popup__button_negative"
            @click="$emit('negativeAction')"
          >
            {{ negativeButton }}
          </button>
          <button
            class="create-popup__button_positive"
            @click="$emit('positiveAction')"
          >
            {{ positiveButton }}
          </button>
        </div>
      </footer>
    </div>
  </popup>
</template>

<script setup>
import popup from "./popup.vue";
import fileUpload from "../UI/file-upload.vue";

defineProps({
  inputTitle: {
    type: String,
    required: true,
  },
  positiveButton: {
    type: String,
    default: "Create",
  },
  negativeButton: {
    type: String,
    default: "Cancel",
  },
});
</script>

<style lang="scss" scoped>
.create-popup {
  min-width: 455px;
}
.create-popup__body {
  padding: 30px;
  display: flex;
  align-items: center;
}
.create-popup__image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.create-popup__form {
  margin-left: 30px;
}
.create-popup__input {
  padding: 0 20px;
  color: var(--color-text);
}
.create-popup__label {
  display: block;
}
.create-popup__footer {
  padding: 20px 30px;
}
.create-popup__footer__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.create-popup__button {
  color: var(--accent-color);
  padding: 5px 20px;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-background-soft-hover);
  }
}
.create-popup__button_negative {
  @extend .create-popup__button;
}
.create-popup__button_positive {
  @extend .create-popup__button;
}
</style>
