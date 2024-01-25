<script setup>
defineProps({
  text: String,
  role: String
})
</script>

<template>
  <li
    class="message"
    :class="{
      'message-user': role === 'user',
      'message-bot': role === 'bot',
      'message-error': role === 'error'
    }"
  >
    {{ text }}
  </li>
</template>

<style scoped>
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
