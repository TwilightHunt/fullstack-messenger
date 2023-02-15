<template>
  <listPopup
    title="Contacts"
    headerAction="mdi-sort"
    positiveButton="Add Contact"
  >
    <div class="contacts-popup">
      <div class="contacts-popup__input-wrapper">
        <input
          type="text"
          class="contacts-popup__search"
          placeholder="Search"
        />
        <v-icon class="contacts-popup__search__input-icon">
          mdi-magnify
        </v-icon>
      </div>
      <listPopupItem
        v-for="i in 3"
        imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
        username="username"
        info="online"
      />
    </div>
  </listPopup>
</template>

<script setup>
import listPopup from "./list-popup.vue";
import listPopupItem from "./list-popup-item.vue";
</script>

<style lang="scss" scoped>
.contacts-popup__input-wrapper {
  position: relative;
}
.contacts-popup__search {
  width: 100%;
  height: 50px;
  padding-left: 57px;
  padding-right: 15px;
  color: var(--color-text);
  background-color: var(--color-background-mute);
  &::placeholder {
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 300;
  }
}
.contacts-popup__search__input-icon {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  left: 5px;
  width: 30px;
  height: 30px;
  opacity: 0.5;
  font-size: 20px;
}
</style>
