import axios from "axios";
import { reactive, toRefs } from "vue";

const baseUrl = import.meta.env.VITE_BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url !== `${baseUrl}/refresh`
    ) {
      try {
        axios
          .get(`${baseUrl}/refresh`, {
            withCredentials: true,
            credentials: "include",
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            axios.request({
              ...originalRequest,
              headers: {
                Authorization: `Bearer ${res.data.token}`,
              },
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export const useFetch = (path, config = {}) => {
  const state = reactive({
    response: {},
    error: null,
    fetching: true,
  });
  const fetchData = async () => {
    try {
      const url = baseUrl + path;
      const res = await axios.request({ url, ...config });
      state.response = res.data;
    } catch (error) {
      state.error = error;
    } finally {
      state.fetching = false;
    }
  };

  return { ...toRefs(state), fetchData };
};
