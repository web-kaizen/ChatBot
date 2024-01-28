<script setup>
import DialogMessage from './DialogMessage.vue'
import { newChat } from '../../store/chat'
import { ref, watch } from 'vue'

const activeChat = newChat()

const messages = ref([])

watch(
  () => activeChat,
  () => {
    messages.value = activeChat.getMessages
  },
  { deep: true }
)
</script>

<template>
  <ul class="messages">
    <DialogMessage
      v-for="message in messages"
      :key="message.id"
      :codeText="message.text"
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
