<script setup>
import { ref } from "vue";
import { SIGN_IN, SIGN_UP } from "../../functions/constants";
import TheHeaderModal from "./TheHeaderModal.vue";
import CloseModalButton from "./CloseModalButton.vue";
import TheFormRegistr from "./TheFormRegistr.vue";
import TheFormAuth from "./TheFormAuth.vue";

const mode = ref(SIGN_UP);
</script>

<template>
  <section class="popup-login">
    <TheHeaderModal>Bot-X</TheHeaderModal>
    <TheFormAuth v-show="mode === SIGN_IN" />
    <TheFormRegistr v-show="mode === SIGN_UP" />
    <CloseModalButton />
  </section>
</template>
