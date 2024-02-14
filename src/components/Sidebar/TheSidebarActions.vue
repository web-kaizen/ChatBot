<script setup>
import BaseButton from '../Base/BaseButton.vue'
import TheButtonControlList from './TheButtonControlList.vue'
import ButtonControlItem from './ButtonControlItem.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { newChat } from '../../store/chat'

const newChatOpen = newChat()
const openChat = () => {
  const { bot, model, mode } = JSON.parse(localStorage.getItem('bots'))
  const title = bot === 'ChatGPT' ? `${model} (${mode})` : bot

  newChatOpen.changeTitle(title)
  newChatOpen.toggleChat(true)
  newChatOpen.changeMessages([])
  // TODO: сделать отправку на бекенд
}
</script>

<template>
  <section class="sidebar-actions">
    <BaseButton class="new-chat-btn" @click="openChat">
      <PlusIcon />
      <span>Новый чат</span>
    </BaseButton>
    <button class="view-sidebar-btn">
      <ButtonControlItem />
    </button>
    <TheButtonControlList />
  </section>
</template>
