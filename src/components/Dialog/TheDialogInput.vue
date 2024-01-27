<script setup>
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['send-message'])
const sendMessage = (event) => {
  const textMessage = String(event.target.firstChild.value)

  if (textMessage.trim()) {
    emit('send-message', textMessage)
  }
  event.target.reset()
}
</script>

<template>
  <form class="chat-form" @submit.prevent="sendMessage($event)">
    <input type="text" class="chat-form__input" placeholder="Напиши..." />
    <button type="button" class="chat-form__img">
      <PhotoIcon />
    </button>
    <button type="submit" class="chat-form__submit">
      <PaperAirplaneIcon />
    </button>
  </form>
</template>
