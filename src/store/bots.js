import { defineStore } from 'pinia'
import Bot from '../libs/Bot.js'

export const useBots = defineStore('bots', {
    state: () => {
        return {
            bots: [],
            selectedBots: {}
        }
    },
    getters: {
        getBots() {
            return this.bots
        },

        getSelectedBots() {
            return this.selectedBots
        }
    },
    actions: {
        async getBotsFromAPI() {
            try {
                let bot = new Bot()
                bot.getList((data) => this.bots = data)
            } catch (error) {
                console.error(error)
            }
        },

        setSelectedBots(type, value) {
            this.selectedBots[type] = value
        }
    }
})