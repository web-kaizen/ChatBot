<script setup>
import { defineProps } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import User from '../../libs/User'

const user = new User()

const { email } = defineProps(['email'])

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
</script>

<template>
  <section class="user-after-login">
    <section class="user">
      <div class="user-logo">{{ email.charAt(0).toUpperCase() }}</div>
      <div class="user-info">
        <div class="user-name">{{ email }}</div>
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
