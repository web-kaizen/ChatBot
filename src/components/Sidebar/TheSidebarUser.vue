<script setup>
import TheUserLogin from "./TheUserLogin.vue";
import TheUserAfterLogin from "./TheUserAfterLogin.vue";

const isLogin = false;
</script>

<template>
  <section class="sidebar-user">
    <TheUserLogin v-show="!isLogin" />
    <TheUserAfterLogin v-show="isLogin" />
  </section>
</template>
