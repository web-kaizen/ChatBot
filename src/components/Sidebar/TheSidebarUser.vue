<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
import TheUserLogin from './TheUserLogin.vue'
import TheUserAfterLogin from './TheUserAfterLogin.vue'

const props = defineProps(['user'])
const emit = defineEmits(['toggle-modal'])
const openModal = () => emit('toggle-modal')

const isLogin = ref(!!props.user)

watch(
  () => props.user,
  (newValue) => {
    isLogin.value = newValue
  }
)
</script>

<template>
  <section class="sidebar-user">
    <TheUserLogin v-show="!isLogin" @toggle-modal="openModal" />
    <TheUserAfterLogin v-show="isLogin" :email="props.user" />
  </section>
</template>
