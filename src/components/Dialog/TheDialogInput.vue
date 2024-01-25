<script setup>
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/vue/24/outline'

let textMessage = ''

const emit = defineEmits(['send-message'])
const sendMessage = () => {
  if (textMessage.trim()) {
    emit('send-message', textMessage)
  }
}
</script>

<template>
  <form class="chat-form" @submit.prevent="sendMessage()">
    <input
      type="text"
      class="chat-form__input"
      placeholder="Напиши..."
      @change="textMessage = $event.target.value"
    />
    <button type="button" class="chat-form__img">
      <PhotoIcon />
    </button>
    <button type="button" class="chat-form__submit" @click="sendMessage()">
      <PaperAirplaneIcon />
    </button>
  </form>
</template>
