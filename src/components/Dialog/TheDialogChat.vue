<script setup>
import Message from '@/libs/Message'

const messages = new Message()

try {
  messages.getList(65)
} catch (error) {
  console.log(error)
}
</script>

<template>
  <ul class="messages">
    <li class="message message-user">Привет!</li>
    <li class="message message-bot">Привет! Как я могу вам помочь!</li>
    <li class="message message-error">
      Простите, но я не понимаю, что вы имеете в виду. Можете объяснить подробнее?
    </li>
  </ul>
</template>

<style scoped>
.messages {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.message {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid#e6e6e6;
}

.message-user {
  background: #fff;
}

.message-bot {
  background: #e6e6e6;
}

.message-error {
  border: 1px solid #f00;
  background: #f6e5e6;
}
</style>
