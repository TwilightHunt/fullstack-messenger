<template>
  <div class="search-link">
    <img :src="imageSrc" alt="" class="search-link__img" />
    <div class="search-link__body">
      <div class="search-link__body__title">{{ title }}</div>
      <div class="search-link__body__info">{{ info }}</div>
    </div>
  </div>
</template>

<script setup>
import useUser from "../../composables/useUser.js";

const props = defineProps({
  image: String,
  title: String,
  info: String,
});

const imageSrc = useUser.getImagePath(props.image);
</script>

<style lang="scss" scoped>
.search-link {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.search-link__img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.search-link__body {
  line-height: 130%;
}
.search-link__body__title {
  font-weight: 600;
  font-size: 0.9em;
}
.search-link__body__info {
  opacity: 0.7;
  font-size: 0.875em;
}
</style>
