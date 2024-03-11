<script setup>
import { ChatBubbleLeftIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Dialogues from '@/libs/Dialogues'
import { userDialoguesStore } from '@/store/userDialogues'

const userDialogues = new Dialogues()
const dialoguesStore = userDialoguesStore()

const emit = defineEmits(['onselect'])
const props = defineProps({
  id: Number,
  title: String
})

const onSelect = () => {
  emit('onselect', props.id)
}

const deleteDialogue = () => {
  userDialogues.delById(props.id, () => {
    console.log(`Dialogue ${props.id} deleted`)
    dialoguesStore.getDialoguesFromApi()
  })
}
</script>

<template>
  <li class="sidebar-item">
    <button class="sidebar-item-btn" @click="onSelect">
      <ChatBubbleLeftIcon />
    </button>
    <p class="sidebar-item-title">{{ title }}</p>
    <button class="sidebar-item-btn">
      <PencilIcon />
    </button>
    <button class="sidebar-item-btn" @click="deleteDialogue">
      <TrashIcon />
    </button>
  </li>
</template>

<style lang="scss" scoped>
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

  .sidebar-item-btn {
    border: none;
    background: transparent;
    transition: all 0.2s ease;

    svg {
      width: 19px;
      height: 18px;
      color: #9b9b9b;
    }

    &:hover {
      transform: scale(1.05);

      svg {
        color: #fff;
      }
    }
  }

  .sidebar-item-title {
    flex: 1;
  }
}
</style>
