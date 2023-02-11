import { reactive, toRefs } from "vue";
import { useFetch } from "./useFetch.js";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api`;
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
  async login({ login, password }) {
    let user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch(
      `${baseUrl}/login`,
      {
        ...config,
        data: { login, password },
      }
    );
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },
  async register({ email, username, password, repeatPassword }) {
    let user = reactive({ data: {}, error: null, fetching: false });
    const { response, error, fetching, fetchData } = useFetch(
      `${baseUrl}/register`,
      {
        ...config,
        data: { email, username, password, repeatPassword },
      }
    );
    await fetchData();
    user.data = response;
    user.error = error;
    user.fetching = fetching;
    return { ...toRefs(user) };
  },
};
