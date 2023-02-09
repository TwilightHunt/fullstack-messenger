import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useAuth from "../composables/useAuth.js";

export const useUserStore = defineStore("user", () => {
  const state = reactive({ user: {} });
  const signIn = async (login, password) => {
    const { data, error } = await useAuth.login({ login, password });
    if (error.value) {
      const errorMessage = error.value.response.data.error;
      throw new Error(errorMessage);
    }
    state.user = data;
    return state.user;
  };

  return { ...toRefs(state), signIn };
});
