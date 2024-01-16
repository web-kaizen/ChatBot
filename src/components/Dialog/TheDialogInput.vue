<script setup>
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <form class="chat-form" id="chat-form">
    <input type="text" id="message-text" class="chat-form__input" placeholder="Напиши..." />
    <button type="button" class="chat-form__img">
      <PhotoIcon />
    </button>
    <button type="submit" class="chat-form__submit">
      <PaperAirplaneIcon />
    </button>
  </form>
</template>
