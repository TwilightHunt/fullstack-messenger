<template>
  <div class="list-popup-item">
    <img :src="imageSrc" alt="-" class="list-popup-item__image" />
    <div class="list-popup-item__info">
      <div class="list-popup-item__info__username">{{ username }}</div>
      <div class="list-popup-item__info__data">
        <v-icon :size="20" v-if="icon" class="list-popup-item__info__icon">
          {{ icon }}
        </v-icon>
        <p>{{ info }}</p>
      </div>
    </div>
    <v-icon v-if="call" class="list-popup-item__icon">mdi-phone</v-icon>
  </div>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  icon: String,
  call: Boolean,
});
</script>

<style lang="scss" scoped>
.list-popup-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background: var(--color-background-soft);
}
.list-popup-item__image {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.list-popup-item__info {
  margin-right: auto;
  margin-left: 20px;
}
.list-popup-item__info__data {
  display: flex;
  align-items: center;
  & > p {
    opacity: 0.5;
    font-weight: 300;
  }
}
.list-popup-item__icon {
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
}
.list-popup-item__info__icon {
  margin-right: 5px;
  color: var(--accent-color);
}
</style>
