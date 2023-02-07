import axios from "axios";
import { reactive, toRefs } from "vue";

export const useFetch = (url, config = {}) => {
  const state = reactive({
    response: [],
    error: null,
    fetching: true,
  });
  const fetchData = async () => {
    try {
      const res = await axios.request({ url, ...config });
      console.log(res.data.user);
      state.response = res.data.user;
    } catch (error) {
      state.error = error;
    } finally {
      state.fetching = false;
    }
  };

  return { ...toRefs(state), fetchData };
};
