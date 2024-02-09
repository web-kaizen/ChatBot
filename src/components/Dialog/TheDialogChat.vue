<script setup>
import { ref, watch } from 'vue'
import DialogMessage from './DialogMessage.vue'
import { newChat } from '../../store/chat'

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
      :name="message.author.name"
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
  padding: 20px;
  height: 100%;
}
</style>
