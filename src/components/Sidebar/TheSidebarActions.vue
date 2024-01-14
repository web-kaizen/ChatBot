<script setup>
import BaseButton from '../Base/BaseButton.vue'
import TheButtonControlList from './TheButtonControlList.vue'
import ButtonControlItem from './ButtonControlItem.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <section class="sidebar-actions">
    <BaseButton class="new-chat-btn">
      <PlusIcon />
      <span>Новый чат</span>
    </BaseButton>
    <button class="view-sidebar-btn">
      <ButtonControlItem />
    </button>
    <TheButtonControlList />
  </section>
</template>
