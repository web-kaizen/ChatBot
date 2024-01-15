<script setup>
import TheSidebar from '../components/Sidebar/TheSidebar.vue'
import TheModal from '../components/Modal/TheModal.vue'
import { ref } from 'vue'

const isOpenModal = ref(false)
const user = ref('')

const getUser = (email) => {
  user.value = email
}

const updUser = (value) => {
  user.value = value
}
</script>

<template>
  <section class="layout">
    <TheSidebar @toggle-modal="isOpenModal = !isOpenModal" @update-props="updUser" :user="user" />
    <TheModal
      :isOpen="isOpenModal"
      @toggle-modal="isOpenModal = !isOpenModal"
      @send-email="getUser"
    />
  </section>
</template>
