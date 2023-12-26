<script setup>
import TheSidebar from "../components/Sidebar/TheSidebar.vue";
import TheModal from "../components/Modal/TheModal.vue";

const isShowPopup = true;
</script>

<template>
  <section class="layout">
    <TheSidebar />
    <TheModal v-show="isShowPopup" />
  </section>
</template>
