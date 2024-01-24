<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TheDialogChat from './TheDialogChat.vue'
import TheDialogInput from './TheDialogInput.vue'
import TheDialogError from './TheDialogError.vue'
import { newChat } from '../../store/chat'

defineProps({
  chatTitle: String
})

const activeChat = newChat()

const handleErrorChat = () => {
  activeChat.toggleError(true)
  activeChat.changeTextError(
    'Извините, но ваш запрос превышает лимит символов. Можете создать новый диалог, чтобы продолжить общение по этой теме. Вот ссылка, чтобы начать новый диалог: создать новый чат.'
  )
}
const closeChat = () => {
  activeChat.toggleChat()
  activeChat.changeTitle('')
  activeChat.toggleError(false)
  activeChat.changeTextError('')
}
</script>

<template>
  <h3 class="chat-title">{{ chatTitle }}</h3>
  <!-- TODO: удалить потом кнопку с ошибкой -->
  <button class="button-error" @click="handleErrorChat">Error</button>
  <TheDialogChat />
  <TheDialogError v-if="activeChat.getIsError" :text="activeChat.getTextError" />
  <TheDialogInput v-else />
  <button class="chat-close" @click="closeChat">
    <XMarkIcon />
  </button>
</template>

<style scoped>
.button-error {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
}
</style>
