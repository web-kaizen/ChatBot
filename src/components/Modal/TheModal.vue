<script setup>
import { ref } from 'vue'
import TheModalAuthForm from './TheModalAuthForm.vue'
import TheModalChecked from './TheModalChecked.vue'

const props = defineProps({
  isOpen: {
    isOpen: Boolean
  }
})

const receivedUser = ref('')
const isRegistSuccess = ref(false)

const emit = defineEmits(['toggle-modal', 'send-email'])
const saveEmail = (email) => emit('send-email', email)
const closeModal = () => emit('toggle-modal')

const receiveUserFromForm = ({ data, mode }) => {
  document.getElementById('regForm').reset()
  document.getElementById('authForm').reset()

  if (mode === 'Auth') {
    if (data.email) {
      saveEmail(data.email)
      closeModal()
    }
  } else if (mode === 'Reg') {
    if (data.email) {
      receivedUser.value = data.email
      isRegistSuccess.value = true
    } else {
      isRegistSuccess.value = false
    }
  }
}
</script>

<template>
  <section class="popup" :class="{ open: props.isOpen }">
    <TheModalAuthForm
      v-show="!isRegistSuccess"
      @toggle-modal="closeModal()"
      @user-from-form="receiveUserFromForm"
    />
    <TheModalChecked
      v-show="isRegistSuccess"
      @toggle-modal="isRegistSuccess = !isRegistSuccess"
      :email="receivedUser"
    />
  </section>
</template>
