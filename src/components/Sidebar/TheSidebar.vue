<script setup>
import TheSidebarActions from "./TheSidebarActions.vue";
import TheSidebarNavVue from "./TheSidebarNav.vue";
import TheSidebarUser from "./TheSidebarUser.vue";

const emit = defineEmits(["toggleModal"]);
const openModal = () => emit("toggleModal");
</script>

<template>
  <aside class="sidebar">
    <TheSidebarActions />
    <TheSidebarNavVue />
    <TheSidebarUser @toggle-modal="openModal()" />
  </aside>
</template>
