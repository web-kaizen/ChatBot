<script setup>
import SidebarNavItem from './SidebarNavItem.vue'

defineProps({
  title: String
})
</script>

<template>
  <p class="sidebar-title">{{ title }}</p>
  <nav class="sidebar-navigation">
    <SidebarNavItem title="Диалог 1" />
    <SidebarNavItem title="Диалог 2" />
    <SidebarNavItem title="Диалог 3" />
    <SidebarNavItem title="Диалог 4" />
    <SidebarNavItem title="Диалог 5" />
  </nav>
</template>

<style scoped>
.sidebar-title {
  padding-left: 10px;
  color: #888;
  font-size: 14px;
}
.sidebar-navigation {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
}
</style>
