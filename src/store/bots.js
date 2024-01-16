import { defineStore } from 'pinia'
import { URL } from '../constants/constants'
import { getData } from '@/functions/functions'

export const useBots = defineStore('bots', {
    state: () => {
        return {
            bots: []
        }
    },
    getters: {
        getBots(state) {
            return state.bots
        }
    },
    actions: {
        async getBotsFromAPI() {
            try {
                // В будущем здесь вызвать метод getList из библиотеки Bot.js
                await getData(URL).then((data) => {
                    this.bots = data
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
})