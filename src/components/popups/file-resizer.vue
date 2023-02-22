<template>
  <popup>
    <div class="file-resizer">
      <header class="file-resizer__header">
        <v-icon class="file-resizer__header__icon-close"> mdi-close </v-icon>
        <div class="file-resizer__header__title">Drag to reposition</div>
      </header>
      <div class="file-resizer__body">
        <div class="file-resizer__container">
          <img
            src="https://i.pinimg.com/564x/ad/9c/e4/ad9ce48b99fc3add1009503bc2ff24eb.jpg"
            alt=""
            class="file-resizer__image"
          />
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import { ref } from "vue";
import popup from "./popup.vue";
</script>

<style lang="scss" scoped></style>
