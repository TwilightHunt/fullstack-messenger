<template>
  <label class="file-upload">
    <v-icon size="40" class="file-upload__icon">
      mdi-camera-plus-outline
    </v-icon>
    <input
      type="file"
      id="avatar"
      name="avatar"
      accept="image/png, image/jpeg"
      class="file-upload__input"
      @change="onUpload"
    />
  </label>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["onupload"]);

const previewImage = (event) => {
  const input = document.querySelector(".file-upload");

  const image = event.target.files[0];

  input.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
  input.style.backgroundColor = "grey";
};
const onUpload = (event) => {
  emit("onupload", event);
};
</script>

<style lang="scss" scoped>
.file-upload {
  background-color: var(--accent-color);
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}
.file-upload__icon {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
.file-upload__input {
  display: none;
}
</style>
