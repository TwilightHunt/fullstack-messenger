<template>
  <div class="google-auth">
    <button @click.prevent="signInWithGoogle">Sign In with Google</button>
  </div>
</template>

<script setup>
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((res) => {
      console.log(res);
      router.push("/");
    })
    .catch((err) => console.log(err));
};
</script>

<style lang="scss" scoped></style>
