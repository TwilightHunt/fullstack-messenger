<template>
  <input
    type="text"
    class="browser__header__input"
    placeholder="Search"
    :size="20"
    @input="search" />
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "../../composables/useFetch";

const result = ref();

const search = async (event) => {
  const { response, error, fetching, fetchData } = useFetch(
    `/search/users?text=${event.target.value}`,
    {
      method: "GET",
    }
  );
  await fetchData();
  if (error.value) {
    console.error(error.value.error);
  }
  result.value = response.value.result;
};
</script>

<style lang="scss" scoped></style>
