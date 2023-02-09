<template>
  <div class="auth">
    <div class="auth-box">
      <div class="auth-box__wrapper">
        <img
          src="../assets/images/telegram-logo-965.png"
          alt="logo"
          class="auth__logo"
        />
        <div class="auth-box__title">Sign in to Messenger</div>
        <transition name="slider" mode="out-in">
          <form
            v-if="$route.path === '/login'"
            class="auth-box__form"
            id="login"
          >
            <input
              type="text"
              class="auth-box__input"
              id="login"
              placeholder="Email or username"
              v-model="data.login"
            />
            <input
              type="password"
              class="auth-box__input"
              id="password_login"
              placeholder="Password"
              v-model="data.password"
            />
            <ActionBtn @click="onLogin" class="auth-box__button"
              >Login</ActionBtn
            >
            <router-link to="/register"
              ><ActionBtn class="auth-box__button_black"
                >Create a new account</ActionBtn
              ></router-link
            >
          </form>

          <form
            class="auth-box__form"
            id="registration"
            v-else-if="$route.path === '/register'"
          >
            <input
              type="text"
              class="auth-box__input"
              id="email"
              placeholder="Email"
              v-model="data.login"
            />
            <input
              type="text"
              class="auth-box__input"
              id="username"
              placeholder="Username"
              v-model="data.login"
            />
            <input
              type="password"
              class="auth-box__input"
              id="password_register"
              placeholder="Password"
              v-model="data.password"
            />
            <input
              type="password"
              class="auth-box__input"
              id="repeat-password"
              placeholder="Repeat password"
              v-model="data.password"
            />
            <ActionBtn class="auth-box__button">Sign Up</ActionBtn>
            <router-link to="/login"
              ><ActionBtn class="auth-box__button_black"
                >Already have an account?</ActionBtn
              ></router-link
            >
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ActionBtn from "../components/UI/action-btn.vue";

import { useUserStore } from "../stores/user.js";
const userStore = useUserStore();

const data = reactive({
  login: "",
  password: "",
});

const onLogin = async () => {
  try {
    const user = await userStore.signIn(data.login, data.password);
    console.log(user);
  } catch (error) {
    alert(error);
  }
};
</script>

<style lang="scss" scoped>
.auth {
  min-height: 100vh;
  display: flex;
  background: var(--auth-bg-img);
}

.auth-box {
  margin: auto;
  background: var(--color-background);
  max-width: 360px;
  border-radius: 10px;
  overflow: hidden;
}

.auth-box__wrapper {
  padding: 32px;
}

.auth__logo {
  display: block;
  max-width: 100px;
  max-height: 100px;
  margin: auto;
}
[data-theme="dark"] {
  .auth__logo {
    filter: invert(100%);
  }
}
.auth-box__title {
  text-align: center;
  margin: 16px 0;
  font-size: 1.142em;
}
.auth-box__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-box__button {
  color: var(--color-text);
  border: 1px solid #333;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
.auth-box__button_black {
  @extend .auth-box__button;
  background-color: var(--color-text);
  color: var(--color-background);
}
.auth-box__input {
  padding: 8px;
  border-radius: 10px;
  font-size: 1.142em;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s ease;
}
.slider-enter-from {
  transform: translate(-150%, 0);
  opacity: 0;
}
.slider-leave-to {
  transform: translate(150%, 0);
  opacity: 0;
}
</style>
