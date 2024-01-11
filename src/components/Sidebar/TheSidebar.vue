<script setup>
import { defineProps, defineEmits } from 'vue'
import TheSidebarActions from './TheSidebarActions.vue'
import TheSidebarNavVue from './TheSidebarNav.vue'
import TheSidebarUser from './TheSidebarUser.vue'

const { user } = defineProps(['user'])
const emit = defineEmits(['toggle-modal'])
const openModal = () => emit('toggle-modal')
</script>

<template>
  <aside class="sidebar">
    <TheSidebarActions />
    <TheSidebarNavVue />
    <TheSidebarUser @toggle-modal="openModal" :user="user" />
  </aside>
</template>
