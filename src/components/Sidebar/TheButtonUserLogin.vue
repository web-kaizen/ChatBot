<script setup>
import { ArrowRightEndOnRectangleIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['toggle-modal'])
const openModal = () => emit('toggle-modal')
</script>

<template>
  <section class="user-login">
    <button class="user-login-btn" @click="openModal()">
      <ArrowRightEndOnRectangleIcon />
      <span>Войти</span>
    </button>
  </section>
</template>
