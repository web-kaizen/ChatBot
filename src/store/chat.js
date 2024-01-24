import { defineStore } from 'pinia'

export const newChat = defineStore('newChat', {
    state: () => {
        return {
            title: '',
            isActive: false,
            textError: '',
            isError: false
        }
    },
    getters: {
        getTitle() {
            return this.title
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
        toggleChat() {
            this.isActive = !this.isActive
            this.isError = false
        },
        toggleError(value) {
            this.isError = value
        },
        changeTitle(value) {
            this.title = value
        },
        changeTextError(value) {
            this.textError = value
        }
    },
})