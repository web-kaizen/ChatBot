<script setup>
import { ref } from 'vue'
import TheHeaderModal from './TheHeaderModal.vue'
import CloseModalButton from './CloseModalButton.vue'
import TheFormRegistr from './TheFormRegistr.vue'
import TheFormAuth from './TheFormAuth.vue'

const mode = ref(false)

const emit = defineEmits(['toggle-modal'])
const closeModal = () => emit('toggle-modal')
</script>

<template>
  <section class="popup-login">
    <TheHeaderModal>Bot-X</TheHeaderModal>
    <TheFormAuth v-show="!mode" @change-form="mode = !mode" />
    <TheFormRegistr v-show="mode" @change-form="mode = !mode" />
    <CloseModalButton @click="closeModal()" />
  </section>
</template>
