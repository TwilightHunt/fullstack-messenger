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
    let user = reactive({ data: {}, error: null, fetching: false });
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
    let user = reactive({ data: {}, error: null, fetching: false });
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
    let user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch("/user-update", {
      ...config,
      method: "PUT",
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },
};
