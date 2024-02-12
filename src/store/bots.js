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
                function callback(result){
                    this.bots = result
                }
                let bot = new Bot()
                await bot.getList(callback)
            } catch (error) {
                console.error(error)
            }
        }
    }
})