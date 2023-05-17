<template>
  <RouterLink :to="`chat=${chat.receiver}`" class="chat-link" @click="goToChat">
    <img :src="useUser.getImagePath(info.user?.profileImage)" class="chat-link__image" />
    <div class="chat-link__body">
      <div class="chat-link__top">
        <div class="chat-link__top__name">{{ chat.receiver }}</div>
        <div class="chat-link__top__info">
          <v-icon class="chat-link__top__icon" size="15"> mdi-check-all </v-icon>
          <div class="chat-link__top__date">{{ info.lastMessage.time }}</div>
        </div>
      </div>
      <div class="chat-link__bottom">
        <div class="chat-link__last-message">
          <div class="chat-link__last-message__text">
            {{ info.lastMessage.text }}
          </div>
        </div>
        <!-- <v-icon class="chat-link__pin" size="15">mdi-pin</v-icon> -->
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import useUser from "../../composables/useUser.js";
import { useChatStore } from "../../stores/chat.js";
import { formatTime } from "../../composables/useDate.js";

const { getChatHistory } = useChatStore();

const props = defineProps({
  chat: Object,
});

const info = reactive({
  lastMessage: {
    time: Date,
    text: String,
  },
  user: {},
});

onMounted(async () => {
  const { data } = await useUser.getUserByUsername(props.chat.receiver);
  info.user = data.value;
  await updateChatPreview();
});

const updateChatPreview = async () => {
  const lastMessage = await getChatHistory(info.user.username, { amount: 1 });
  info.lastMessage.time = formatTime(lastMessage[0].time);
  info.lastMessage.text = lastMessage[0].text;
};

const goToChat = () => {
  if (window.screen.width <= 1160) {
    const browser = document.querySelector(".browser");
    browser.style.transform = "translateX(-100%)";
  }
};
</script>

<style lang="scss" scoped>
.chat-link {
  padding: 10px 12px;
  display: flex;
  width: 100%;
  font-size: 0.875em;
}
.chat-link__last-message {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.chat-link__image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}
.chat-link__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.chat-link__top {
  display: flex;
  justify-content: space-between;
}
.chat-link__top__info {
  display: flex;
  align-items: center;
}
.chat-link__top__icon {
  margin-right: 5px;
  color: var(--accent-color);
}
.chat-link__bottom {
  display: flex;
  justify-content: space-between;
}
.chat-link__pin {
  opacity: 0.3;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
}
</style>
