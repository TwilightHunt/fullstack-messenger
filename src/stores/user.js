import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useAuth from "../composables/useAuth.js";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive({ user: {} });
    const signIn = async (loginData) => {
      const { data, error } = await useAuth.login({ ...loginData });
      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };

    const signUp = async (registrationData) => {
      const { data, error } = await useAuth.register({ ...registrationData });
      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };
    const update = async (newData) => {
      const updatedData = { ...state.user, ...newData };
      const { data, error } = await useAuth.update({ ...updatedData });
      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      return state.user;
    };
    return { ...toRefs(state), signIn, signUp, update };
  },
  {
    persist: true,
  }
);
