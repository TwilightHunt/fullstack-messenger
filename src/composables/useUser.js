import { reactive, toRefs } from "vue";
import { useFetch } from "./useFetch.js";

const config = {
  method: "POST",
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  async login(data) {
    const user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch("/login", {
      ...config,
      data,
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },

  async register(data) {
    const user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch("/register", {
      ...config,
      data,
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },

  async update(data) {
    const user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch("/user-update", {
      ...config,
      method: "PUT",
      data,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },

  async getUserByUsername(username) {
    const user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch("/user", {
      ...config,
      data: { username },
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },

  getImagePath(filename) {
    return `${import.meta.env.VITE_SERVER_URL}/${filename}`;
  },
};
