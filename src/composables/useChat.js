import { reactive, toRefs } from "vue";
import { useFetch } from "./useFetch.js";

const config = {
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  async send(data) {
    const { fetchData, error } = useFetch("/send", {
      ...config,
      data,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await fetchData();
    return { error };
  },

  async getChats() {
    const chats = reactive({ data: {}, error: null, fetching: false });

    const { response, error, fetching, fetchData } = useFetch("/chats", {
      ...config,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await fetchData();
    chats.data = response;
    chats.error = error;
    chats.fetching = fetching;

    return { ...toRefs(chats) };
  },

  async getChatHistory(chatId, { offset = 0, amount = 10 }) {
    const history = reactive({ data: {}, error: null, fetching: false });

    const url = `/chat?${chatId}&offset=${offset}&amount=${amount}`;

    const { response, error, fetching, fetchData } = useFetch(url, {
      ...config,
      method: "GET",
    });
    await fetchData();
    history.data = response;
    history.error = error;
    history.fetching = fetching;

    return { ...toRefs(chats) };
  },
};
