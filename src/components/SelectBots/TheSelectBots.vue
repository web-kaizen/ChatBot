<script setup>
import { ref, onMounted, watch } from 'vue'

import SelectBotsItem from '@/components/SelectBots/SelectBotsItem.vue'
import { URL } from '../../constants/constants'
import { getData } from '@/functions/functions'

const listBots = ref([])
const listModels = ref([])
const listModes = ref([])
const selectedBot = ref('')
const selectedModel = ref('')
const selectedMode = ref('')

const renderSelect = (list) => {
  const sectorObj = localStorage.getItem('bots') ? JSON.parse(localStorage.getItem('bots')) : {}
  listBots.value = list
  listModels.value = listBots.value[0].modelList
  listModes.value = listModels.value[0].modeList

  selectedBot.value = sectorObj.bot || listBots.value[0].name
}

const onChangeSelectBots = (value) => {
  selectedBot.value = value
}

const onChangeSelectModel = (value) => {
  selectedModel.value = value
  listModes.value = listModels.value.find((model) => model.name === selectedModel.value).modeList
  selectedMode.value = listModes.value[0].name
  saveToLocalStorage()
}

const onChangeSelectMode = (value) => {
  selectedMode.value = value
  saveToLocalStorage()
}

const saveToLocalStorage = () => {
  const sectorObj = {
    bot: selectedBot.value,
    model: selectedModel.value,
    mode: selectedMode.value
  }
  localStorage.setItem('bots', JSON.stringify(sectorObj))
}

onMounted(() => {
  try {
    // В будущем здесь вызвать метод getList из библиотеки Bot.js
    getData(URL).then((data) => {
      renderSelect(data)
    })
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => selectedBot,
  () => {
    const sectorObj = localStorage.getItem('bots') ? JSON.parse(localStorage.getItem('bots')) : {}

    if (selectedBot.value === 'ChatGpt') {
      selectedModel.value = sectorObj.model || listModels.value[0].name
      listModes.value = listModels.value.find(
        (model) => model.name === selectedModel.value
      ).modeList
      selectedMode.value = sectorObj.mode || listModes.value[0].name
    } else {
      selectedModel.value = ''
      selectedMode.value = ''
    }
    saveToLocalStorage()
  },
  { deep: true }
)
</script>

<template>
  <section class="select-bot">
    <SelectBotsItem
      :items="listBots"
      :isSelected="selectedBot"
      @change-select="onChangeSelectBots"
    />
    <SelectBotsItem
      v-if="selectedBot === 'ChatGpt'"
      :items="listModels"
      :isSelected="selectedModel"
      @change-select="onChangeSelectModel"
    />
    <SelectBotsItem
      v-if="selectedBot === 'ChatGpt'"
      :items="listModes"
      :isSelected="selectedMode"
      @change-select="onChangeSelectMode"
    />
  </section>
</template>
