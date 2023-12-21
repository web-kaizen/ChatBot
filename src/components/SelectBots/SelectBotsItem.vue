<template>
  <select v-model="selectedBot" @change="handleBotChange">
    <option v-for="bot in bots" :key="bot.name" :value="bot.name">{{ bot.name }}</option>
  </select>

  <select v-if="selectedBot === 'ChatGpt'" v-model="selectedModel" @change="handleModelChange">
    <option v-for="model in selectedBotData.modelList" :key="model.name" :value="model.name">{{ model.name }}</option>
  </select>

  <select v-if="selectedBot === 'ChatGpt' && selectedModel === 'Gpt-3.5'" v-model="selectedMode"
          @change="handleModeChange">
    <option v-for="mode in selectedModelData.modeList" :key="mode.name" :value="mode.name">{{ mode.name }}</option>
  </select>

  <select v-if="selectedBot === 'ChatGpt' && selectedModel === 'Gpt-4'" v-model="selectedMode"
          @change="handleModeChange">
    <option v-for="mode in selectedModelData.modeList" :key="mode.name" :value="mode.name">{{ mode.name }}</option>
  </select>
</template>

<script>
import {getData} from "@/functions/functions.js";

export default {
  data() {
    return {
      bots: [],
      selectedBot: '',
      selectedModel: '',
      selectedMode: ''
    };
  },
  methods: {
    handleBotChange() {
      this.saveToLocalStorage();
    },
    handleModelChange() {
      if (this.selectedModel === 'Gpt-3.5') {
        this.selectedMode = '4k context';
      } else if (this.selectedModel === 'Gpt-4') {
        this.selectedMode = '8k context';
      }
      this.saveToLocalStorage();
    },
    handleModeChange() {
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const sectorObj = {
        bot: this.selectedBot,
        model: this.selectedModel,
        mode: this.selectedMode
      };
      localStorage.setItem('bots', JSON.stringify(sectorObj));
    }
  },
  mounted() {
    try {
      const bots = getData();
      this.bots = bots;
      const sectorObj = localStorage.getItem('bots') ? JSON.parse(localStorage.getItem('bots')) : {};
      this.selectedBot = sectorObj.bot || (this.bots.length > 0 ? this.bots[0].name : '');
      this.selectedModel = sectorObj.model || '';
      this.selectedMode = sectorObj.mode || '';
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  },
  computed: {
    selectedBotData() {
      return this.bots.find(bot => bot.name === this.selectedBot) || {};
    },
    selectedModelData() {
      return this.selectedBotData.modelList.find(model => model.name === this.selectedModel) || {};
    }
  }
};

</script>







