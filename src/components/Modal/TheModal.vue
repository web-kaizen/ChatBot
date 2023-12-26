<script setup>
import TheModalAuthForm from "./TheModalAuthForm.vue";
import TheModalChecked from "./TheModalChecked.vue";

const { isOpen } = defineProps({ isOpen: Boolean });

const isRegistSuccess = false;

const emit = defineEmits(["toggleModal"]);
const closeModal = () => emit("toggleModal");
</script>

<template>
  <section class="popup" :class="{ open: isOpen }">
    <TheModalAuthForm v-show="!isRegistSuccess" @toggle-modal="closeModal()" />
    <TheModalChecked v-show="isRegistSuccess" />
  </section>
</template>
