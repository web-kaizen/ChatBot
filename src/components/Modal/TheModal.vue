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

const emit = defineEmits(['toggleModal', 'sendEmail'])
const saveEmail = (email) => emit('sendEmail', email)
const closeModal = () => emit('toggleModal')

const receiveUserFromForm = ({ data, mode }) => {
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
    <TheModalChecked v-show="isRegistSuccess" :email="receivedUser" />
  </section>
</template>
