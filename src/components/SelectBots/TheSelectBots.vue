<script setup>
import { ref, watch } from 'vue'
import SelectBotsItem from '@/components/SelectBots/SelectBotsItem.vue'
import { useBots } from '@/store/bots'

const allBots = useBots()
const listBots = ref([])
const listModels = ref([])
const listModes = ref([])
const { bot, model, mode } = allBots.getSelectedBots
const selectedBot = ref(bot)
const selectedModel = ref(model)
const selectedMode = ref(mode)

const renderSelect = () => {
  const bots = allBots.getBots
  if (!bots) return

  listBots.value = bots
  if (selectedBot.value)
    listModels.value = bots.find((bot) => bot.name === selectedBot.value).modelList
  if (selectedModel.value)
    listModes.value = listModels.value.find((model) => model.name === selectedModel.value).modeList
}

const onChangeSelectBots = (value) => {
  selectedBot.value = value
  allBots.setSelectedBots('bot', value)
  listModels.value = listBots.value.find((bot) => bot.name === selectedBot.value).modelList
  selectedModel.value = ''
  selectedMode.value = ''
}

const onChangeSelectModel = (value) => {
  selectedModel.value = value
  allBots.setSelectedBots('model', value)
  listModes.value = listModels.value.find((model) => model.name === selectedModel.value).modeList
  selectedMode.value = ''
}

const onChangeSelectMode = (value) => {
  selectedMode.value = value
  allBots.setSelectedBots('mode', value)
}

renderSelect()

watch(
  () => allBots,
  () => {
    renderSelect()
  },
  { deep: true }
)

watch(
  () => selectedBot,
  () => {
    if (selectedBot.value !== 'ChatGPT') {
      selectedModel.value = ''
      selectedMode.value = ''
      allBots.setSelectedBots('model', '')
      allBots.setSelectedBots('mode', '')
    }
  },
  { deep: true }
)
</script>

<template>
  <section class="select-bot">
    <SelectBotsItem
      text="бота"
      :items="listBots"
      :selected="bot"
      @change-select="onChangeSelectBots"
    />
    <SelectBotsItem
      v-if="selectedBot === 'ChatGPT'"
      text="модели"
      :items="listModels"
      :selected="model"
      @change-select="onChangeSelectModel"
    />
    <SelectBotsItem
      v-if="selectedBot === 'ChatGPT' && selectedModel"
      text="режим"
      :items="listModes"
      :selected="mode"
      @change-select="onChangeSelectMode"
    />
  </section>
</template>
