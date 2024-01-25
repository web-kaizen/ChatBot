<script setup>
import TheSelectBots from '@/components/SelectBots/TheSelectBots.vue'
import TheDialog from '@/components/Dialog/TheDialog.vue'
import { newChat } from '../../store/chat'

const activeChat = newChat()
</script>

<template>
  <main class="main">
    <section v-if="!activeChat.getIsActive" class="main-content">
      <TheSelectBots />
      <h1 class="bot-title">Bot-X</h1>
    </section>
    <section v-else class="main-chat">
      <TheDialog :chat-title="activeChat.getTitle" />
    </section>
  </main>
</template>
