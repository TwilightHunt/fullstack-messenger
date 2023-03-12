<template>
  <div v-if="route.params.chat" class="chat">
    <header class="chat__header">
      <div class="chat__header__title">
        <img
          :src="useUser.getImagePath(data.receiver.profileImage)"
          alt=""
          class="chat__header__avatar"
        />
        <div class="chat__header__title__info">
          <div class="chat__header__title__name">
            {{ data.receiver.username }}
          </div>
          <div class="chat__header__title__status">online</div>
        </div>
      </div>
      <div class="chat__header__tools">
        <v-icon class="chat__tool_search">mdi-magnify</v-icon>
        <v-icon class="chat__tool_call">mdi-phone-outline</v-icon>
        <v-icon class="chat__tool_options">mdi-dots-vertical</v-icon>
      </div>
    </header>
    <div class="chat__body">
      <message v-for="message in history.slice().reverse()" mine>{{
        message
      }}</message>
    </div>
    <div class="chat__type-footer">
      <div class="chat__type-footer__input">
        <v-icon class="chat__tool_emoji chat__type-footer__action_emoji"
          >mdi-emoticon-cool-outline</v-icon
        >
        <input
          placeholder="Message"
          type="text"
          class="chat__type-footer__input-box"
          v-model="data.message"
        />
        <v-icon class="chat__tool_attach chat__type-footer__action_attach"
          >mdi-attachment</v-icon
        >
        <v-icon
          class="chat__tool_voice chat__type-footer__action_voice"
          @click="sendMessage"
          >mdi-microphone-outline</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import message from "./message.vue";
import { useChatStore } from "../../stores/messages.js";
import { reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";
import useUser from "../../composables/useUser.js";

const route = useRoute();
const useChats = useChatStore();

const history = ref([]);

const data = reactive({
  message: "",
  receiver: {},
});

const sendMessage = async () => {
  try {
    await useChats.send({ ...data });
    history.value = await useChats.getChatHistory(data.receiver.username);
    data.message = "";
    scrollDown();
  } catch (error) {
    alert(error);
  }
};

const scrollDown = () => {
  const chatBody = document.querySelector(".chat__body");
  chatBody.scrollTop = chatBody.scrollHeight;
};

watch(
  () => route.params.chat,
  async (newValue) => {
    try {
      const { data: res } = await useUser.getUserByUsername(newValue);
      data.receiver = res.value.user;
      history.value = await useChats.getChatHistory(data.receiver.username);
      setTimeout(scrollDown, 10);
    } catch (error) {
      alert(error);
    }
  }
);
</script>

<style lang="scss" scoped>
@import "../../assets/mixins/action-btn.scss";
@import "../../assets/mixins/scrollbar.scss";
.chat {
  flex: 1 1 auto;
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
  flex: 0 0 auto;
  padding: 15px 30px;
  overflow-y: scroll;
  max-height: calc(100vh - 110px);
  @include scrollbar(#fff, $width: 0);
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
