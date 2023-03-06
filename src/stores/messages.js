import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useChat from "../composables/useChat";

export const useChatStore = defineStore(
  "chats",
  () => {
    const state = reactive({ chats: [] });

    const send = async (messageData) => {
      const { data, error } = await useChat.send({ ...messageData });
      if (error.value) {
        const errorMessage = error.value;
        throw new Error(errorMessage);
      }
      state.chats = data.value.chats;
      return state.chats;
    };

    return { ...toRefs(state), send };
  },
  {
    persist: true,
  }
);
