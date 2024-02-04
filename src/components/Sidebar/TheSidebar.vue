<script setup>
import { defineProps, defineEmits } from 'vue'
import TheSidebarActions from './TheSidebarActions.vue'
import TheSidebarNav from './TheSidebarNav.vue'
import TheSidebarUser from './TheSidebarUser.vue'

const { user } = defineProps(['user'])
const emit = defineEmits(['toggle-modal', 'update-props'])
const openModal = () => emit('toggle-modal')
</script>

<template>
  <aside class="sidebar">
    <TheSidebarActions />
    <div class="sidebar__nav-wrapper">
      <TheSidebarNav title="Сегодня" />
      <TheSidebarNav title="Вчера" />
    </div>
    <TheSidebarUser
      @toggle-modal="openModal"
      @update-props="emit('update-props', '')"
      :user="user"
    />
  </aside>
</template>

<style scoped>
.sidebar__nav-wrapper {
  flex: 1;
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
