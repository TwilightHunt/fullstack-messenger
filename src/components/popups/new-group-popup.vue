<template>
  <createPopup
    inputTitle="Group name"
    positiveButton="Next"
    @negativeAction="closePopup"
  />
</template>

<script setup>
import createPopup from "./create-popup.vue";
import usePopups from "../../composables/usePopups";

const { setActivePopup } = usePopups();

const closePopup = () => {
  setActivePopup("");
};
</script>

<style lang="scss" scoped></style>
