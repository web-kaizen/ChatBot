<script setup>
import { ArrowRightEndOnRectangleIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["toggleModal"]);
const openModal = () => emit("toggleModal");
</script>

<template>
  <section class="user-login">
    <button class="user-login-btn" @click="openModal()">
      <ArrowRightEndOnRectangleIcon />
      <span>Войти</span>
    </button>
  </section>
</template>
