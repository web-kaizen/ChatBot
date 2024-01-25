<script setup>
import DialogMessage from './DialogMessage.vue'
import Message from '@/libs/Message'

const messages = new Message()

try {
  messages.getList(65, 0, undefined, (data) => console.log(data))
} catch (error) {
  console.log(error)
}
</script>

<template>
  <ul class="messages">
    <DialogMessage text="Привет!" role="user" />
    <DialogMessage text="Привет! Как я могу вам помочь!" role="bot" />
    <DialogMessage
      text="Простите, но я не понимаю, что вы имеете в виду. Можете объяснить подробнее?"
      role="error"
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
