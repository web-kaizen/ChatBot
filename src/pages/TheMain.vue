<script setup>
import TheSidebar from '../components/Sidebar/TheSidebar.vue'
import TheMainContent from '@/components/MainContent/TheMainContent.vue'
import TheModal from '../components/Modal/TheModal.vue'

import { ref } from 'vue'

const isOpenModal = ref(false)
</script>

<template>
  <section class="layout">
    <TheSidebar @toggle-modal="isOpenModal = !isOpenModal" />
    <TheModal :isOpen="isOpenModal" @toggle-modal="isOpenModal = !isOpenModal" />
    <TheMainContent />
  </section>
</template>
