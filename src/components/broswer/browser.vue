<template>
  <div class="browser">
    <header class="browser__header">
      <v-btn
        flat
        color="transparent"
        icon
        class="browser__header__burger-button"
        :size="40"
        @click="openMenu">
        <v-icon class="browser__header__burger-icon"> mdi-menu </v-icon>
      </v-btn>
      <div class="browser__header__search">
        <input
          type="text"
          class="browser__header__input"
          placeholder="Search"
          :size="20"
          @input="search"
          v-model="query" />
        <v-icon class="browser__header__input-icon"> mdi-magnify </v-icon>
      </div>
    </header>
    <div class="browser__search">
      <search-link
        v-for="link in result"
        :image="link.profileImage"
        :title="link.username"
        :info="link.email" />
    </div>
    <div class="browser__chats" v-if="!query">
      <chatLink v-for="chat in chatStore.chats" :chat="chat" />
    </div>
  </div>
</template>

<script setup>
import chatLink from "./chat-link.vue";
import { useChatStore } from "../../stores/chat.js";
import { onMounted } from "vue";
import searchLink from "./search-link.vue";
import { ref } from "vue";
import { useFetch } from "../../composables/useFetch";

const chatStore = useChatStore();

const openMenu = () => {
  const menu = document.querySelector(".menu");
  menu.classList.remove("_closed");
};

onMounted(async () => {
  await chatStore.getChats();
});

const result = ref();
const query = ref();

const search = async () => {
  const { response, error, fetching, fetchData } = useFetch(`/search/users?text=${query.value}`, {
    method: "GET",
  });
  await fetchData();
  if (error.value) {
    console.error(error.value.error);
  }
  result.value = response.value.result;
};
</script>

<style lang="scss" scoped>
@import "../../assets/mixins/scrollbar.scss";

.browser {
  background-color: var(--color-background-soft);
  //width: 20vw;
  flex: 0 0 20%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-right: 1px solid #ffffff25;
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
  padding: 6px 13px 10px 13px;
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
