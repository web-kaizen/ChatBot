<script setup>
import { onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TheDialogChat from './TheDialogChat.vue'
import TheDialogInput from './TheDialogInput.vue'
import TheDialogError from './TheDialogError.vue'
import { newChat } from '@/store/chat'
import { userChats } from '@/store/userChats'
import Message from '@/libs/Message'
import { userDialoguesStore } from '@/store/userDialogues'

const userDialogues = userDialoguesStore()

// TODO: эти данные будем получать с бекенда
const botId = 1

const messages = new Message()
const activeChat = newChat()
const userDialogs = userChats()

defineProps({
  chatTitle: String
})

const getAllMessages = (id) => {
  messages.getList(id, 0, undefined, (data) => {
    if ('result' in data) {
      userDialogs.addUserChat(id, data)
    } else if ('error' in data) {
      messages.handleApiError(data.error)
    }
  })
}

const onSendMessage = (textMess) => {
  let dialogId = userDialogs.getCurrentChatId

  const sendMessage = (dialogId) => {
    console.log(dialogId)

    messages.send(dialogId, textMess, botId, (data) => {
      if ('result' in data) {
        userDialogs.addMessagesInCurrentChat(dialogId, data.result)

        const currentChat = userDialogs.getUserChats
        activeChat.changeMessages(currentChat.find((chat) => chat.id === dialogId).messages)
      } else if ('error' in data) {
        messages.handleApiError(data.error)
      }
    })
  }

  if (!dialogId) {
    userDialogues
      .createNewDialogue(`Диалог ${Math.round(Math.random() * 100)}`, botId)
      .then((newDialogId) => {
        dialogId = newDialogId
        userDialogs.changeCurrentChatId(dialogId)
        sendMessage(dialogId)
      })
      .catch((error) => {
        console.error(error)
      })
  } else {
    sendMessage(dialogId)
  }
}

const closeChat = () => {
  activeChat.toggleChat(false)
  activeChat.changeTitle('')
  activeChat.toggleError(false)
  activeChat.changeTextError('')
}

onMounted(() => {
  userDialogues.getDialoguesFromApi()
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
