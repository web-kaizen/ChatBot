import { defineStore } from 'pinia'

export const userChats = defineStore('userChats', {
    state: () => {
        return {
            chats: []
        }
    },
    getters: {
        getUserChats() {
            return this.chats
        }
    },
    actions: {
        addUserChat(id, messages) {
            if (!this.chats.find(chat => chat.id === id)) {
                this.chats.push({ id, messages })
            } else {
                this.chats = this.chats.map(chat => {
                    if (chat.id === id) {
                        chat.messages = messages
                    }
                    return chat
                })
            }
        },
        removeUserChat(chatId) {
            this.chats = this.chats.filter(chat => chat.id !== chatId)
        },
        addMessagesInCurrentChat(chatId, messages) {
            this.chats = this.chats.map(chat => {
                if (chat.id === chatId) {
                    chat.messages.push(messages)
                }
                return chat
            })
        }
    }
})