<script setup>
import { ref } from 'vue'
import TheHeaderModal from './TheHeaderModal.vue'
import CloseModalButton from './CloseModalButton.vue'
import TheFormRegistr from './TheFormRegistr.vue'
import TheFormAuth from './TheFormAuth.vue'

const mode = ref(false)

const emit = defineEmits(['toggle-modal', 'user-from-form'])
const closeModal = () => emit('toggle-modal')
const sendUserToModal = (data) => emit('user-from-form', data)
</script>

<template>
  <section class="popup-login">
    <TheHeaderModal>Bot-X</TheHeaderModal>
    <TheFormAuth v-show="!mode" @change-form="mode = !mode" @user-to-modal="sendUserToModal" />
    <TheFormRegistr v-show="mode" @change-form="mode = !mode" @user-to-modal="sendUserToModal" />
    <CloseModalButton @click="closeModal()" />
  </section>
</template>
