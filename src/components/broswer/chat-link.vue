<template>
  <div class="chat-link">
    <img
      src="https://i.pinimg.com/564x/ee/fd/71/eefd716e32199443a9b22b19e77add79.jpg"
      alt=""
      class="chat-link__image"
    />
    <div class="chat-link__body">
      <div class="chat-link__top">
        <div class="chat-link__top__name">TEMP</div>
        <div class="chat-link__top__info">
          <v-icon class="chat-link__top__icon" size="15">
            mdi-check-all
          </v-icon>
          <div class="chat-link__top__date">03.02.2001</div>
        </div>
      </div>
      <div class="chat-link__bottom">
        <div class="chat-link__last-message">
          <div class="chat-link__last-message__text">TEMP</div>
        </div>
        <v-icon class="chat-link__pin" size="15">mdi-pin</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.chat-link {
  padding: 10px 12px;
  display: flex;
  width: 100%;
  font-size: 0.875em;
}
.chat-link__image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}
.chat-link__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.chat-link__top {
  display: flex;
  justify-content: space-between;
}
.chat-link__top__info {
  display: flex;
  align-items: center;
}
.chat-link__top__icon {
  margin-right: 5px;
  color: var(--accent-color);
}
.chat-link__bottom {
  display: flex;
  justify-content: space-between;
}
.chat-link__pin {
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
}
</style>
