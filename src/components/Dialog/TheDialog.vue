<script setup>
import { onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TheDialogChat from './TheDialogChat.vue'
import TheDialogInput from './TheDialogInput.vue'
import TheDialogError from './TheDialogError.vue'
import { newChat } from '../../store/chat'
import { userChats } from '../../store/userChats'
import Message from '@/libs/Message'

// TODO: эти данные будем получать с бекенда
const dialogId = 80
const botId = 1

const messages = new Message()
const activeChat = newChat()
const userDialogs = userChats()

defineProps({
  chatTitle: String
})

const onSendMessage = (textMess) => {
  messages.send(dialogId, textMess, botId, (data) => {
    if ('result' in data) {
      userDialogs.addMessagesInCurrentChat(dialogId, data.result)

      const currentChat = userDialogs.getUserChats
      activeChat.changeMessages(currentChat.find((chat) => chat.id === dialogId).messages)
    } else if ('error' in data) {
      let { text, code } = data.error

      if (code === 'rate_limit_exceeded') handleErrorChat(text)
      if (code === 'context_limit_exceeded') handleErrorChat(text)
      if (code === 'insufficient_quota') handleErrorChat(text)

      if (code === 'invalid_text') alert(text)
      if (code === 'invalid_bot_id') alert(text)
      if (code === 'invalid_access_token') alert(text)
      if (code === 'dialogue_access_denied') alert(text)
      if (code === 'version_not_found') alert(text)
      if (code === 'application_not_found') alert(text)
      if (code === 'dialogue_not_found') alert(text)
      if (code === 'bot_not_found') alert(text)
      if (code === 'server_error') alert(text)
      if (code === 'dialogue_access_denied') alert(text)
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
