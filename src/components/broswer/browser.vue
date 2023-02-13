<template>
  <div class="browser">
    <Menu />
    <header class="browser__header">
      <v-btn
        flat
        color="transparent"
        icon
        class="browser__header__burger-button"
        :size="40"
      >
        <v-icon class="browser__header__burger-icon"> mdi-menu </v-icon>
      </v-btn>
      <div class="browser__header__search">
        <input
          type="text"
          class="browser__header__input"
          placeholder="Search"
          :size="20"
        />
        <v-icon class="browser__header__input-icon"> mdi-magnify </v-icon>
      </div>
    </header>
    <div class="browser__chats">
      <chatLink v-for="link in 40" />
    </div>
  </div>
</template>

<script setup>
import chatLink from "./chat-link.vue";
import Menu from "../menu/menu.vue";
</script>

<style lang="scss" scoped>
@import "../../assets/mixins/scrollbar.scss";

.browser {
  background-color: var(--color-background-soft);
  max-width: 33vw;
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}
.browser__chats {
  @include scrollbar(#000);
  overflow-y: scroll;
  flex: 0 1 100%;
}
[data-theme="dark"] {
  .browser__chats {
    @include scrollbar(#fff);
  }
}
.browser__header__burger-icon {
  color: var(--color-heading);
  opacity: 0.7;
}
.browser__header {
  padding: 6px 13px;
  display: flex;
  position: sticky;
}
.browser__header__search {
  position: relative;
  margin-left: 13px;
  flex: 0 1 100%;
}
.browser__header__input {
  width: 100%;
  border: 2px solid transparent;
  border-radius: 1.375rem;
  padding: 6px 41px 7px 43px;
  color: var(--color-text);
  background-color: var(--color-background-mute);
  &::placeholder {
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 300;
  }
}
.browser__header__input-icon {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  left: 5px;
  width: 20px;
  height: 20px;
  opacity: 0.5;
  font-size: 20px;
}
</style>
