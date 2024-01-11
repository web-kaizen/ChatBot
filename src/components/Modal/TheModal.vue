<script setup>
import { ref } from "vue";
import TheModalAuthForm from "./TheModalAuthForm.vue";
import TheModalChecked from "./TheModalChecked.vue";

const props = defineProps({
  isOpen: {
    isOpen: Boolean,
  },
});

const receivedUser = ref("");
const isRegistSuccess = ref(false);

const receiveUserFromForm = ({ email }) => {
  receivedUser.value = email;

  receivedUser
    ? (isRegistSuccess.value = true)
    : (isRegistSuccess.value = false);
};

const emit = defineEmits(["toggleModal"]);
const closeModal = () => emit("toggleModal");
</script>

<template>
  <section class="popup" :class="{ open: props.isOpen }">
    <TheModalAuthForm
      v-show="!isRegistSuccess"
      @toggle-modal="closeModal()"
      @user-from-form="receiveUserFromForm"
    />
    <TheModalChecked v-show="isRegistSuccess" :email="receivedUser" />
  </section>
</template>
