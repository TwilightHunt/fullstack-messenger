import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useChat from "../composables/useChat";

export const useChatStore = defineStore(
  "chats",
  () => {
    const state = reactive({ chats: [] });

    const send = async (messageData) => {
      const { error } = await useChat.send({ ...messageData });
      if (error.value) {
        const errorMessage = error.value.message;
        throw new Error(errorMessage);
      }
      await getChats();
    };

    const getChats = async () => {
      const { data, error } = await useChat.getChats();
      if (error.value) {
        const errorMessage = error.value;
        throw new Error(errorMessage);
      }
      state.chats = data.value;
    };

    const getChatHistory = async (username, { offset, amount } = {}) => {
      const chatId = state.chats.find((el) => el.receiver === username)?._id;

      if (!chatId) {
        return [];
      }

      const { data, error } = await useChat.getChatHistory(chatId, {
        offset,
        amount,
      });
      if (error.value) {
        const errorMessage = error.value;
        throw new Error(errorMessage);
      }
      return data.value;
    };

    return { ...toRefs(state), send, getChats, getChatHistory };
  },
  {
    persist: true,
  }
);
