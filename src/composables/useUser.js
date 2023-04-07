import { reactive, toRefs } from "vue";
import { useFetch } from "./useFetch.js";

const config = {
  method: "GET",
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  async update(data) {
    const user = reactive({ data: {}, error: null, fetching: false });

    const { response, error, fetching, fetchData } = useFetch("users/update", {
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
    const { response, error, fetching, fetchData } = useFetch(`users/user?username=${username}`, {
      ...config,
      data: { username },
    });
    await fetchData();
    user.data = response.value;
    user.error = error.value;
    user.fetching = fetching.value;
    return { ...toRefs(user) };
  },

  getImagePath(filename) {
    return `${import.meta.env.VITE_SERVER_URL}/${filename}`;
  },
};
