<script setup>
import { ChatBubbleLeftIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  title: String
})
</script>

<template>
  <li class="sidebar-item">
    <ChatBubbleLeftIcon />
    <p class="sidebar-item-title">{{ title }}</p>
    <PencilIcon />
    <TrashIcon />
  </li>
</template>

<style scoped>
.sidebar-item {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background: #3f3f3f;
  cursor: pointer;
  color: #fff;
}

.sidebar-item svg {
  width: 19px;
  height: 18px;
  color: #9b9b9b;
}

.sidebar-item-title {
  flex: 1;
}
</style>
