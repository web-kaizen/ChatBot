<script setup>
import { PaperAirplaneIcon, PhotoIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue'
import { newChat } from '../../store/chat'

const activeChat = newChat()
const loading = ref(false)
const emit = defineEmits(['send-message'])
const sendMessage = (event) => {
  const textMessage = String(event.target.firstChild.value)

  if (textMessage.trim()) {
    loading.value = true
    emit('send-message', textMessage)
    event.target.reset()
  }
}

watch(
  () => activeChat,
  () => {
    loading.value = false
  },
  { deep: true }
)
</script>

<template>
  <form class="chat-form" @submit.prevent="sendMessage($event)" :disabled="loading">
    <input :disabled="loading" type="text" class="chat-form__input" placeholder="Напиши..." />
    <button
      :class="{ disabled_img: loading }"
      :disabled="loading"
      type="button"
      class="chat-form__img"
    >
      <PhotoIcon />
    </button>
    <button
      :class="{ disabled: loading }"
      :disabled="loading"
      type="submit"
      class="chat-form__submit"
    >
      <span v-if="loading"><ArrowPathIcon /></span>
      <span v-else><PaperAirplaneIcon /></span>
    </button>
  </form>
</template>

<style scoped>
.disabled_img {
  pointer-events: none;
  opacity: 0.6;
}
.disabled {
  pointer-events: none;
  opacity: 0.6;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
