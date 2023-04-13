import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useUser from "../composables/useUser.js";
import useAuth from "../composables/useAuth.js";

export const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive({ user: {} });

    const profileImagePath = () => useUser.getImagePath(state.user.profileImage);

    const signIn = async (loginData) => {
      const { data, error } = await useAuth.login({ ...loginData });
      if (error.value) {
        console.log(error.value);
        throw new Error(error.value);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };

    const signUp = async (registrationData) => {
      const { data, error } = await useAuth.register({ ...registrationData });

      if (error.value) {
        const errorMessage = error.value;
        throw new Error(errorMessage);
      }
      state.user = data.value.user;
      localStorage.setItem("token", data.value.token);
      return state.user;
    };

    const logout = async () => {
      const { error } = await useAuth.logout();
      if (error.value) {
        console.log(error.value);
        const errorMessage = error.value.error;
        throw new Error(errorMessage);
      }
      state.user = {};
      localStorage.removeItem("token");
    };

    const update = async (newData) => {
      const entries = Object.entries({ ...state.user, ...newData });

      const formData = new FormData();
      entries.forEach(([key, val] = entry) => {
        formData.set(key, val);
      });

      const { data, error } = await useUser.update(formData);

      if (error.value) {
        throw new Error(error.value);
      }
      state.user = data.value;
      return state.user;
    };
    return { ...toRefs(state), signIn, signUp, update, logout, profileImagePath };
  },
  {
    persist: true,
  }
);
