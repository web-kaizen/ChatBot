<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TheDialogChat from './TheDialogChat.vue'
import TheDialogInput from './TheDialogInput.vue'
import TheDialogError from './TheDialogError.vue'
import { newChat } from '../../store/chat'
import { userChats } from '../../store/userChats'
import Message from '@/libs/Message'
import { onMounted } from 'vue'

const dialogId = 68
const botId = 1

const messages = new Message()
const activeChat = newChat()
const userDialogs = userChats()

defineProps({
  chatTitle: String
})

const onSendMessage = (text) => {
  try {
    messages.send(dialogId, text, botId, (data) => {
      userDialogs.addMessagesInCurrentChat(dialogId, data.result)
    })
  } catch (error) {
    console.log(error)
  }
}

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

onMounted(() => {
  try {
    messages.getList(dialogId, 0, undefined, (data) => {
      userDialogs.addUserChat(dialogId, data.result)
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h3 class="chat-title">{{ chatTitle }}</h3>
  <!-- TODO: удалить потом кнопку с ошибкой -->
  <button class="button-error" @click="handleErrorChat">Error</button>
  <TheDialogChat />
  <TheDialogError v-if="activeChat.getIsError" :text="activeChat.getTextError" />
  <TheDialogInput v-else @send-message="onSendMessage" />
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
