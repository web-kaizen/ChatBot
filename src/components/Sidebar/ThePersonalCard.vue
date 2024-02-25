<script setup>
import { onMounted, ref, watch } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import User from '../../libs/User'
import { useUserStore } from '@/store/user'

const user = new User()
const userStore = useUserStore()
const userEmail = ref('')

const emit = defineEmits(['toggle-login-card'])
const changeCard = () => emit('toggle-login-card')

const logOut = () => {
  try {
    user.logout(changeCard)
  } catch (error) {
    let json = JSON.parse(error.message)
    alert(json.text)
  }
}

watch(
  () => userStore,
  () => {
    userEmail.value = userStore.getEmail
  },
  { deep: true }
)

onMounted(() => {
  userEmail.value = userStore.getEmail
})
</script>

<template>
  <section class="user-after-login">
    <section class="user">
      <div class="user-logo">{{ userEmail && userEmail.charAt(0).toUpperCase() }}</div>
      <div class="user-info">
        <div class="user-name">{{ userEmail && userEmail }}</div>
        <div class="user-balance">
          <p>Баланс: <span id="balance">100р</span></p>
          <button class="user-balance-update">
            <ArrowPathIcon />
          </button>
        </div>
      </div>
    </section>
    <section class="user-actions">
      <button class="topup-balance">Пополнить</button>
      <button class="user-logout" @click="logOut()">Выйти</button>
    </section>
  </section>
</template>
