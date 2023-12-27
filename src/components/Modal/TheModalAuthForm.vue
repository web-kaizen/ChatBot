<script setup>
import { ref } from "vue";
import { SIGN_IN, SIGN_UP } from "../../functions/constants";
import TheHeaderModal from "./TheHeaderModal.vue";
import CloseModalButton from "./CloseModalButton.vue";
import TheFormRegistr from "./TheFormRegistr.vue";
import TheFormAuth from "./TheFormAuth.vue";

const mode = ref(false);

const emit = defineEmits(["toggleModal"]);
const closeModal = () => emit("toggleModal");

function submitForm(formFields) {
  console.log(formFields);
}
</script>

<template>
  <section class="popup-login">
    <TheHeaderModal>Bot-X</TheHeaderModal>
    <TheFormAuth
      v-show="!mode"
      @change-form="mode = !mode"
      @submit-form="submitForm"
    />
    <TheFormRegistr
      v-show="mode"
      @change-form="mode = !mode"
      @submit-form="submitForm"
    />
    <CloseModalButton @click="closeModal()" />
  </section>
</template>
