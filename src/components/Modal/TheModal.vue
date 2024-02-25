<script setup>
import { ref, watch } from 'vue'
import TheModalAuthForm from './TheModalAuthForm.vue'
import TheModalChecked from './TheModalChecked.vue'
import { useUserStore } from '@/store/user'

const props = defineProps({
  isOpen: {
    isOpen: Boolean
  }
})

const userStore = useUserStore()
const isRegistSuccess = ref(false)

const emit = defineEmits(['toggle-modal'])
const closeModal = () => emit('toggle-modal')

watch(
  () => userStore,
  () => {
    if (userStore.getEmail && !userStore.getIsAuth) {
      isRegistSuccess.value = true
    } else if (userStore.getEmail && userStore.getIsAuth) {
      closeModal()
    } else {
      isRegistSuccess.value = false
    }
  },
  { deep: true }
)
</script>

<template>
  <section class="popup" :class="{ open: props.isOpen }">
    <TheModalAuthForm v-show="!isRegistSuccess" @toggle-modal="closeModal()" />
    <TheModalChecked v-show="isRegistSuccess" @toggle-modal="isRegistSuccess = !isRegistSuccess" />
  </section>
</template>
