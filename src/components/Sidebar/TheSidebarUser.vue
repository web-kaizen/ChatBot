<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
import TheButtonUserLogin from './TheButtonUserLogin.vue'
import ThePersonalCard from './ThePersonalCard.vue'

const props = defineProps(['user'])
const emit = defineEmits(['toggle-modal', 'update-props'])
const openModal = () => emit('toggle-modal')

const isLogin = ref(false)

const logOut = () => {
  isLogin.value = false
  emit('update-props', '')
}

watch(
  () => props.user,
  () => {
    isLogin.value = !!props.user
  }
)
</script>

<template>
  <section class="sidebar-user">
    <TheButtonUserLogin v-show="!isLogin" @toggle-modal="openModal" />
    <ThePersonalCard v-show="isLogin" :email="props.user" @toggle-login-card="logOut()" />
  </section>
</template>
