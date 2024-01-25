<script setup>
import { onMounted } from 'vue'
import TheMain from './pages/TheMain.vue'
import { useBots } from './store/bots'

onMounted(async () => await useBots().getBotsFromAPI())
</script>

<template>
  <TheMain />
</template>
