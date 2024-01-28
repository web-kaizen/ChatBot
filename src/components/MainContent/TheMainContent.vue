<script setup>
import TheSelectBots from '@/components/SelectBots/TheSelectBots.vue'
import TheDialog from '@/components/Dialog/TheDialog.vue'
import { newChat } from '../../store/chat'
import { ref, watch } from 'vue'

const activeChat = newChat()
const messagesContainerRef = ref(null)

const scrollToBottom = () => {
  const containerRef = messagesContainerRef.value
  if (containerRef) {
    setTimeout(() => {
      containerRef.scrollTop = containerRef.scrollHeight
    }, 0)
  }
}

watch(
  () => activeChat,
  () => {
    scrollToBottom()
  },
  { deep: true }
)
</script>

<template>
  <main class="main">
    <section v-if="!activeChat.getIsActive" class="main-content">
      <TheSelectBots />
      <h1 class="bot-title">Bot-X</h1>
    </section>
    <section v-else class="main-chat" ref="messagesContainerRef">
      <TheDialog :chat-title="activeChat.getTitle" />
    </section>
  </main>
</template>
