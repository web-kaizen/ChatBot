import { defineStore } from 'pinia'
import Bot from '../libs/Bot.js'

export const useBots = defineStore('bots', {
    state: () => {
        return {
            bots: []
        }
    },
    getters: {
        getBots() {
            return this.bots
        }
    },
    actions: {
        async getBotsFromAPI() {
            try {
                let bot = new Bot()
                await bot.getList((data) => this.bots = data)
            } catch (error) {
                console.error(error)
            }
        }
    }
})