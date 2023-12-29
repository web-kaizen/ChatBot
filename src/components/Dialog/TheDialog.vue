<script setup>
import {PaperAirplaneIcon, PhotoIcon, XMarkIcon} from '@heroicons/vue/24/outline'
</script>

<script>
export default {
  data() {
    return {
      isChatOpen: false,
      chatTitle: '',
    };
  },
  methods: {
    openNewChat({ bot, model, mode }) {
      this.isChatOpen = true;
      if (bot === 'ChatGpt') {
        this.chatTitle = `${model} (${mode})`;
      } else {
        this.chatTitle = bot;
      }
    },
    closeChat() {
      this.isChatOpen = false;
    },
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      const newChatBtn = document.querySelector('.new-chat-btn');

      newChatBtn.addEventListener('click', () => {
        this.openNewChat(JSON.parse(localStorage.getItem('bots')));
      });
    });
  },
};
</script>

<template>
    <button class="new-chat-btn" @click="openNewChat">Открыть чат</button>
    <h3 class="chat-title">{{ chatTitle }}</h3>
    <section class="chat-dialog"></section>
    <form class="chat-form" id="chat-form">
      <input type="text" id="message-text" class="chat-form__input" placeholder="Напиши...">
      <button type="button" class="chat-form__img">
        <PhotoIcon />
      </button>
      <button type="submit" class="chat-form__submit">
        <PaperAirplaneIcon />
      </button>
    </form>
    <section class="chat-close">
      <XMarkIcon />
    </section>
</template>
