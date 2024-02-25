<script setup>
import { ref, watch } from 'vue'
import SidebarNavItem from './SidebarNavItem.vue'
import { userDialoguesStore } from '@/store/userDialogues'

const userDialogues = userDialoguesStore()
const dialoguesList = ref([])

const selectedDialogue = (id) => {
  console.log(id)
}

watch(
  () => userDialogues,
  () => {
    const dialogues = userDialogues.getDialogues
    console.log(dialogues)
    if (dialogues) dialoguesList.value = dialogues
  },
  { deep: true }
)
</script>

<template>
  <nav v-if="dialoguesList.length" class="sidebar-navigation">
    <SidebarNavItem
      v-for="dialogue in dialoguesList"
      :id="dialogue.id"
      :title="dialogue.name"
      :key="dialogue.id"
      @onselect="selectedDialogue"
    />
  </nav>
</template>

<style scoped>
.sidebar-navigation {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
}
</style>
