import { defineStore } from 'pinia'

export const newChat = defineStore('newChat', {
    state: () => {
        return {
            title: '',
            messages: [],
            isActive: false,
            textError: '',
            isError: false
        }
    },
    getters: {
        getTitle() {
            return this.title
        },
        getMessages() {
            return this.messages
        },
        getIsActive() {
            return this.isActive
        },
        getTextError() {
            return this.textError
        },
        getIsError() {
            return this.isError
        }
    },
    actions: {
        toggleChat(value) {
            this.isActive = value
            this.isError = false
        },
        toggleError(value) {
            this.isError = value
        },
        changeTitle(value) {
            this.title = value
        },
        changeMessages(value) {
            this.messages = value
        },
        changeTextError(value) {
            this.textError = value
        }
    },
})