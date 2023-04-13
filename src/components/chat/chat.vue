<template>
  <div v-if="route.params.chat" class="chat">
    <header class="chat__header">
      <div class="chat__header__title">
        <img
          :src="useUser.getImagePath(data.receiver.profileImage)"
          alt=""
          class="chat__header__avatar" />
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
        <v-icon class="chat__tool_options" @click="openOptions">mdi-dots-vertical</v-icon>
      </div>
      <Transition name="appear">
        <bubble class="chat__header__options-bubble" v-if="optionsIsActive" :items="optionsArray" />
      </Transition>
    </header>
    <div class="chat__body">
      <message
        v-for="message in history"
        :mine="user._id === message.senter"
        :time="message.time"
        :key="message._id"
        >{{ message.text }}</message
      >
      <chat-state
        v-if="history.length === 0"
        :title="'No messages here yet...'"
        :text="'Send a message to start the dialog'" />
      <div ref="target"></div>
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
          @keyup="onInputKeyup"
          ref="input" />
        <v-icon class="chat__tool_attach chat__type-footer__action_attach">mdi-attachment</v-icon>
        <v-icon class="chat__tool_voice chat__type-footer__action_voice" @click="sendMessage">
          {{ data.message ? "mdi-send" : "mdi-microphone-outline" }}</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { socket } from "@/socket";

import message from "./message.vue";
import bubble from "../UI/bubbles/bubble.vue";
import chatState from "./chat-state.vue";

import { useChatStore } from "../../stores/chat.js";
import { storeToRefs } from "pinia";

import useUser from "../../composables/useUser.js";
import { useUserStore } from "../../stores/user.js";
import { setBubbleListeners, optionsArray } from "../../composables/useBubble.js";

const { user } = storeToRefs(useUserStore());
const route = useRoute();
const useChats = useChatStore();

const history = ref([]);
const input = ref();
const target = ref();

let currentOffset = 0;
const offset = 20;

socket.on("connect", () => {
  console.log("connected!");
});

socket.on("message", async (event) => {
  const message = JSON.parse(event.content);

  if (message.event === "send") {
    history.value = await useChats.getChatHistory(data.receiver.username);
  }
});

const data = reactive({
  message: "",
  receiver: {},
});

const sendMessage = async () => {
  try {
    await useChats.send({ ...data });

    const message = {
      event: "send",
      placeholder: {
        user: user.value,
        receiver: data.receiver,
        message: data.message,
      },
    };

    socket.emit("send", JSON.stringify(message));
    history.value = await useChats.getChatHistory(data.receiver.username);
    data.message = "";
    input.value.focus();
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => route.params.chat,
  async (newValue) => {
    try {
      const { data: res } = await useUser.getUserByUsername(newValue);
      data.receiver = res.value;
      history.value = await useChats.getChatHistory(data.receiver.username);
      input.value.focus();
      setObserver();
    } catch (error) {
      console.log(error);
    }
  }
);

const setObserver = () => {
  let options = {
    rootMargin: "5px",
    threshold: 0.5,
  };

  const intersectionCallback = async (entries) => {
    if (entries[0].isIntersecting) {
      currentOffset += offset;
      const newMessages = await useChats.getChatHistory(data.receiver.username, {
        offset: currentOffset,
      });
      history.value = [...history.value, ...newMessages];
    }
  };

  let observer = new IntersectionObserver(intersectionCallback, options);
  observer.observe(target.value);
};

const onInputKeyup = async (event) => {
  if (event.key === "Enter") {
    await sendMessage();
  }
};

const optionsIsActive = ref(false);

const openOptions = (e) => {
  optionsIsActive.value = !optionsIsActive.value;

  setBubbleListeners((event) => {
    if (!event.target.className.includes("chat__tool_options")) {
      optionsIsActive.value = false;
    }
  });
};
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
  position: relative;
  background: var(--color-background-soft);
  padding: 8px 25px;
}
.chat__header__options-bubble {
  right: 0;
  top: 100%;
  margin-top: 6px;
  margin-right: 10px;
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
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  max-height: calc(100vh - 110px);
  background-size: cover;
  background-image: url("@/assets/images/backgrounds/chat-bg-dark.jpg");
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
  color: var(--color-text);
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
.appear-enter-active {
  animation: appear 0.2s;
}
.appear-leave-active {
  animation: appear 0.2s reverse;
}
@keyframes appear {
  0% {
    transform: scale(0);
    transform-origin: top right;
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
