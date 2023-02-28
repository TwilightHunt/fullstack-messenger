import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useAuth from "../composables/useAuth.js";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive({ user: {} });

    const profileImagePath = () =>
      `${import.meta.env.VITE_SERVER_URL}/${state.user.profileImage}`;

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
      const entries = Object.entries({ ...state.user, ...newData });

      const formData = new FormData();
      entries.forEach(([key, val] = entry) => {
        formData.set(key, val);
      });

      const { data, error } = await useAuth.update(formData);

      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      return state.user;
    };
    return { ...toRefs(state), signIn, signUp, update, profileImagePath };
  },
  {
    persist: true,
  }
);
