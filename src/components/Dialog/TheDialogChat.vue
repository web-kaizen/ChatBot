<script setup>
import { watch, ref } from 'vue'
import DialogMessage from './DialogMessage.vue'
import { userChats } from '../../store/userChats'

const dialogId = 68

const messagesCurrentChat = ref([])
const userDialogs = userChats()

watch(
  () => userDialogs,
  () => {
    const currentChat = userDialogs.getUserChats
    messagesCurrentChat.value = currentChat.find((chat) => chat.id === dialogId).messages
  },
  { deep: true }
)
</script>

<template>
  <ul class="messages">
    <DialogMessage
      v-for="message in messagesCurrentChat"
      :key="message.id"
      :text="message.text"
      :role="message.author.role"
    />
  </ul>
</template>

<style scoped>
.messages {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
  padding: 0 10px 20px 10px;
  overflow-y: auto;
  height: 100%;
}
</style>
