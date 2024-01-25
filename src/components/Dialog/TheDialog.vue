<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TheDialogInput from './TheDialogInput.vue'
import { newChat } from '../../store/chat'

defineProps({
  chatTitle: String
})

const activeChat = newChat()
const closeChat = () => {
  activeChat.toggleChat()
  activeChat.changeTitle('')
}
</script>

<template>
  <h3 class="chat-title">{{ chatTitle }}</h3>
  <section class="chat-dialog">Здесь будут выводиться сообщения</section>
  <TheDialogInput />
  <button class="chat-close" @click="closeChat">
    <XMarkIcon />
  </button>
</template>
