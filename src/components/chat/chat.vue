<template>
  <div class="chat">
    <header class="chat__header">
      <div class="chat__header__title">
        <img
          src="https://i.pinimg.com/564x/4f/56/6b/4f566bf31494543742b6c7501af186f1.jpg"
          alt=""
          class="chat__header__avatar"
        />
        <div class="chat__header__title__info">
          <div class="chat__header__title__name">NAME</div>
          <div class="chat__header__title__status">online</div>
        </div>
      </div>
      <div class="chat__header__tools">
        <v-icon class="chat__tool_search">mdi-magnify</v-icon>
        <v-icon class="chat__tool_call">mdi-phone-outline</v-icon>
        <v-icon class="chat__tool_options">mdi-dots-vertical</v-icon>
      </div>
    </header>
    <div class="chat__body"></div>
    <div class="chat__type-footer">
      <div class="chat__type-footer__input">
        <v-icon class="chat__tool_emoji chat__type-footer__action_emoji"
          >mdi-emoticon-cool-outline</v-icon
        >
        <input
          placeholder="Message"
          type="text"
          class="chat__type-footer__input-box"
        />
        <v-icon class="chat__tool_attach chat__type-footer__action_attach"
          >mdi-attachment</v-icon
        >
        <v-icon class="chat__tool_voice chat__type-footer__action_voice"
          >mdi-microphone-outline</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../../assets/mixins/action-btn.scss";
.chat {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.chat__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-background-soft);
  padding: 8px 25px;
}
.chat__header__title {
  display: flex;
  align-items: center;
}
.chat__header__avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 8px;
}
.chat__header__title__info {
  line-height: 120%;
}
.chat__header__title__status {
  color: var(--accent-color);
}
.chat__header__tools {
  display: flex;
  gap: 20px;
}
.chat__body {
  flex: 1 0 auto;
}
.chat__type-footer {
  margin-top: auto;
  display: flex;
}

.chat__type-footer__input {
  flex: 1 0 auto;
  position: relative;
}
.chat__type-footer__input-box {
  width: 100%;
  padding: 15px 60px;
  background: var(--color-background-soft);
  &:focus {
    outline-width: 0;
  }
}
.chat__type-footer__action_attach {
  right: 50px;
}
.chat__type-footer__action_voice {
  right: 0;
}
.chat__type-footer__action_emoji {
  left: 30px;
}
[class*="chat__type-footer__action_"] {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
[class*="chat__tool_"] {
  @include action-btn($base_opacity: 0.7);
}
</style>
