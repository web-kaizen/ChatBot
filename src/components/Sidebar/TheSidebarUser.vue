<script setup>
import TheUserLogin from "./TheUserLogin.vue";
import TheUserAfterLogin from "./TheUserAfterLogin.vue";

const isLogin = false;
const emit = defineEmits(["toggleModal"]);
const openModal = () => emit("toggleModal");
</script>

<template>
  <section class="sidebar-user">
    <TheUserLogin v-show="!isLogin" @toggle-modal="openModal()" />
    <TheUserAfterLogin v-show="isLogin" />
  </section>
</template>
