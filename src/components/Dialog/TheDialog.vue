<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TheDialogChat from './TheDialogChat.vue'
import TheDialogInput from './TheDialogInput.vue'
import TheDialogError from './TheDialogError.vue'
import { newChat } from '../../store/chat'
import { userChats } from '../../store/userChats'
import Message from '@/libs/Message'
import { onMounted } from 'vue'

// TODO: эти данные будем получать с бекенда
const dialogId = 77
const botId = 1

const messages = new Message()
const activeChat = newChat()
const userDialogs = userChats()

defineProps({
  chatTitle: String
})

const onSendMessage = (text) => {
  messages.send(dialogId, text, botId, (data) => {
    if ('result' in data) {
      userDialogs.addMessagesInCurrentChat(dialogId, data.result)

      const currentChat = userDialogs.getUserChats
      activeChat.changeMessages(currentChat.find((chat) => chat.id === dialogId).messages)
    } else {
      let { code, message } = data.error

      if (code === 'rate_limit_exceeded') handleErrorChat(message)
      if (code === 'context_limit_exceeded') handleErrorChat(message)
      if (code === 'insufficient_quota') handleErrorChat(message)

      if (code === 'invalid_text') alert(message)
      if (code === 'invalid_bot_id') alert(message)
      if (code === 'invalid_access_token') alert(message)
      if (code === 'dialogue_access_denied') alert(message)
      if (code === 'version_not_found') alert(message)
      if (code === 'application_not_found') alert(message)
      if (code === 'dialogue_not_found') alert(message)
      if (code === 'bot_not_found') alert(message)
      if (code === 'server_error') alert(message)
      if (code === 'dialogue_access_denied') alert(message)
    }
  })
}

const handleErrorChat = (text) => {
  activeChat.toggleError(true)
  activeChat.changeTextError(text)
}

const closeChat = () => {
  activeChat.toggleChat(false)
  activeChat.changeTitle('')
  activeChat.toggleError(false)
  activeChat.changeTextError('')
}

onMounted(() => {
  messages.getList(dialogId, 0, undefined, (data) => userDialogs.addUserChat(dialogId, data))
})
</script>

<template>
  <h3 class="chat-title">{{ chatTitle }}</h3>
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
