import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import useAuth from "../composables/useAuth.js";

export const useUserStore = defineStore("user", () => {
  const state = reactive({ user: {} });
  const signIn = async (login, password) => {
    try {
      const { data } = await useAuth.login({ login, password });
      state.user = data;
    } catch (error) {
      console.log(error);
    }
  };

  return { ...toRefs(state), signIn };
});
