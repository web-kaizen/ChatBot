<script setup>
import { ref, watch, defineEmits, onMounted } from 'vue'
import TheButtonUserLogin from './TheButtonUserLogin.vue'
import ThePersonalCard from './ThePersonalCard.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const emit = defineEmits(['toggle-modal'])
const openModal = () => emit('toggle-modal')

const isLogin = ref(false)

const logOut = () => {
  isLogin.value = false
  userStore.logout()
}

watch(
  () => userStore,
  () => {
    isLogin.value = userStore.getIsAuth
  },
  { deep: true }
)

onMounted(() => {
  isLogin.value = userStore.getIsAuth
})
</script>

<template>
  <section class="sidebar-user">
    <TheButtonUserLogin v-show="!isLogin" @toggle-modal="openModal" />
    <ThePersonalCard v-show="isLogin" @toggle-login-card="logOut()" />
  </section>
</template>
