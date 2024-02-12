import { defineStore } from 'pinia'
import { URL } from '../constants/constants'
import { getData } from '@/functions/functions'
import { Bot } from '../libs/Bot.js'

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
                // В будущем здесь вызвать метод getList из библиотеки Bot.js
                let bot = new Bot()
                await getData(bot.getList()).then((data) => {
                    this.bots = data
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
})