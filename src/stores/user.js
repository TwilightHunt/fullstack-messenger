import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useAuth from "../composables/useAuth.js";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive({ user: {} });
    const signIn = async (loginData) => {
      const { login, password } = loginData;
      const { data, error } = await useAuth.login({ login, password });
      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };
    const signUp = async (registrationData) => {
      const { email, username, password, repeatPassword } = registrationData;
      const { data, error } = await useAuth.register({
        email,
        username,
        password,
        repeatPassword,
      });
      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };
    return { ...toRefs(state), signIn, signUp };
  },
  {
    persist: true,
  }
);
