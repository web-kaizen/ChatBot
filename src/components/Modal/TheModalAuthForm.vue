<script setup>
import { ref } from "vue";
import TheHeaderModal from "./TheHeaderModal.vue";
import CloseModalButton from "./CloseModalButton.vue";
import TheFormRegistr from "./TheFormRegistr.vue";
import TheFormAuth from "./TheFormAuth.vue";

const mode = ref(false);

const emit = defineEmits(["toggleModal", "userFromForm"]);
const closeModal = () => emit("toggleModal");
const sendUserToModal = (user) => emit("userFromForm", user);
</script>

<template>
  <section class="popup-login">
    <TheHeaderModal>Bot-X</TheHeaderModal>
    <TheFormAuth
      v-show="!mode"
      @change-form="mode = !mode"
      @toggle-modal="closeModal()"
    />
    <TheFormRegistr
      v-show="mode"
      @change-form="mode = !mode"
      @toggle-modal="closeModal()"
      @user-to-modal="sendUserToModal"
    />
    <CloseModalButton @click="closeModal()" />
  </section>
</template>
