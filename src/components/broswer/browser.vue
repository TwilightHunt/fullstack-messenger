<template>
  <div class="browser">
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
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.browser {
  background-color: var(--color-background-soft);
  max-width: 33vw;
  min-width: 20vw;
  height: 100vh;
}
.browser__header__burger-icon {
  color: var(--color-heading);
  opacity: 0.7;
}
.browser__header {
  padding: 6px 13px;
  display: flex;
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
