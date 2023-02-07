import { reactive, toRefs } from "vue";
import { useFetch } from "./useFetch.js";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/login`;

export const login = ({ login, password }) => {
  let user = reactive({ data: {}, error: null, fetching: false });
  const { response, error, fetching, fetchData } = useFetch(baseUrl, {
    method: "POST",
    data: { login, password },
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  fetchData();
  user.data = response;
  user.error = error;
  user.fetching = fetching;
  return { ...toRefs(user) };
};
