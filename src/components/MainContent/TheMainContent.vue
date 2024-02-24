<script setup>
import TheSelectBots from '@/components/SelectBots/TheSelectBots.vue'
import TheDialog from '@/components/Dialog/TheDialog.vue'
import { newChat } from '@/store/chat'
import { ref, watch } from 'vue'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const activeChat = newChat()
const messagesContainerRef = ref(null)
const isError = ref(false)

const scrollToBottom = () => {
  const containerRef = messagesContainerRef.value
  if (containerRef) {
    setTimeout(() => {
      containerRef.scrollTop = containerRef.scrollHeight
    }, 0)
  }
}

const closeError = () => {
  activeChat.toggleError(false)
  activeChat.changeTextError('')
}

watch(
  () => activeChat,
  () => {
    scrollToBottom()
    isError.value = activeChat.getIsError
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

    <section class="main-error" v-show="isError">
      <button class="error-close" @click="closeError">
        <XMarkIcon />
      </button>
      <ExclamationTriangleIcon />
      <p>{{ activeChat.getTextError }}</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.main-error {
  position: absolute;
  width: 30%;
  height: 60px;
  padding: 20px;
  border-radius: 12px;
  background: #f8d7d7;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  svg {
    width: 30px;
    height: 30px;
    color: #ff0000;
  }
}

.error-close {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0;
  background: transparent;

  svg {
    width: 100%;
    height: 100%;
    color: #000;
  }
}
</style>
