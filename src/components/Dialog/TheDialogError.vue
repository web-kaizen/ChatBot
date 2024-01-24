<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
defineProps({
  text: String
})
</script>

<template>
  <section class="chat-error">
    <ExclamationTriangleIcon />
    <span class="chat-error-text">{{ text }}</span>
  </section>
</template>

<style scoped>
.chat-error {
  width: 100%;
  position: absolute;
  padding: 20px 100px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: #e6e6e6;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: start;
  gap: 14px;
}

.chat-error svg {
  width: 24px;
  height: 24px;
  color: #fd6b02;
}

.chat-error-text {
  font-size: 16px;
  color: #000;
}
</style>
