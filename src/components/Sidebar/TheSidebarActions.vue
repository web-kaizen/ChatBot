<script setup>
import BaseButton from '../Base/BaseButton.vue'
import TheButtonControlList from './TheButtonControlList.vue'
import ButtonControlItem from './ButtonControlItem.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { newChat } from '@/store/chat'
import { useBots } from '@/store/bots'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const newChatOpen = newChat()
const allBots = useBots()

const openChat = () => {
  const userIsAuth = userStore.getIsAuth
  const { bot, model, mode } = allBots.getSelectedBots
  const title = bot === 'ChatGPT' ? `${model} (${mode})` : bot

  if (!userIsAuth) {
    newChatOpen.toggleError(true)
    newChatOpen.changeTextError('Войдите в аккаунт')
    return
  }
  if (!bot) {
    newChatOpen.toggleError(true)
    newChatOpen.changeTextError('Выберите бота')
    return
  }

  if (!model && bot === 'ChatGPT') {
    newChatOpen.toggleError(true)
    newChatOpen.changeTextError('Выберите модель')
    return
  }

  if (!mode && bot === 'ChatGPT') {
    newChatOpen.toggleError(true)
    newChatOpen.changeTextError('Выберите режим')
    return
  }
  if (title) {
    newChatOpen.changeTitle(title)
    newChatOpen.toggleChat(true)
    newChatOpen.changeMessages([])
    // TODO: сделать отправку на бекенд
  }
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
