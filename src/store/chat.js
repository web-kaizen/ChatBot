import { defineStore } from 'pinia'

export const newChat = defineStore('newChat', {
    state: () => {
        return {
            title: '',
            isActive: false
        }
    },
    getters: {
        getTitle() {
            return this.title
        },
        getIsActive() {
            return this.isActive
        }
    },
    actions: {
        toggleChat() {
            this.isActive = !this.isActive
        },
        changeTitle(title) {
            this.title = title
        }
    },
})