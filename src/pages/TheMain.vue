<script setup>
import TheSidebar from "../components/Sidebar/TheSidebar.vue";
import TheModal from "../components/Modal/TheModal.vue";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <section class="layout">
    <TheSidebar @toggle-modal="isOpen = !isOpen" />
    <TheModal :isOpen="isOpen" @toggle-modal="isOpen = !isOpen" />
  </section>
</template>
