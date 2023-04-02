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
    const { response, error, fetching, fetchData } = useFetch("auth/login", {
      ...config,
      data,
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },

  async logout() {
    const { error, fetchData } = useFetch("auth/logout", {
      ...config,
      method: "GET",
    });
    await fetchData();
    return { error };
  },

  async register(data) {
    const user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch("auth/register", {
      ...config,
      data,
    });
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },
};
