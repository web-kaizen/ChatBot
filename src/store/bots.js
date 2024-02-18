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
        getBotsFromAPI() {
            try {
                let bot = new Bot()
                bot.getList((data) => this.bots = data)
            } catch (error) {
                console.error(error)
            }
        }
    }
})