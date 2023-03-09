import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useUser from "../composables/useUser.js";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive({ user: {} });

    const profileImagePath = () =>
      useUser.getImagePath(state.user.profileImage);

    const signIn = async (loginData) => {
      const { data, error } = await useUser.login({ ...loginData });
      if (error.value) {
        const errorMessage = error.value.response.data.error;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };

    const signUp = async (registrationData) => {
      const { data, error } = await useUser.register({ ...registrationData });
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

      const { data, error } = await useUser.update(formData);

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
