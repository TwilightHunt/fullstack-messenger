<template>
  <listPopup title="Calls" headerAction="mdi-dots-vertical">
    <div class="calls-popup">
      <listPopupItem
        v-for="i in 3"
        imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
        username="username"
        info="(5) January 1 at 7:55pm"
        call
        icon="mdi-arrow-top-right"
      />
    </div>
  </listPopup>
</template>

<script setup>
import listPopup from "./list-popup.vue";
import listPopupItem from "./list-popup-item.vue";
</script>

<style lang="scss"></style>
