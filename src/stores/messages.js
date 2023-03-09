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
      state.chats = data.value.chats;
    };

    return { ...toRefs(state), send, getChats };
  },
  {
    persist: true,
  }
);
