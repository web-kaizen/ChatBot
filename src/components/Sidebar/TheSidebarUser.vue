<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
import TheUserLogin from './TheUserLogin.vue'
import TheUserAfterLogin from './TheUserAfterLogin.vue'

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
    <TheUserLogin v-show="!isLogin" @toggle-modal="openModal" />
    <TheUserAfterLogin v-show="isLogin" :email="props.user" @toggle-login-card="logOut()" />
  </section>
</template>
