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
        addUserChat(id, data) {
            if (data) {
                if ('result' in data) {
                    let { result: messages } = data

                    if (!this.chats.find(chat => chat.id === id)) {
                        this.chats.push({ id, messages })
                    } else {
                        this.chats = this.chats.map(chat => {
                            if (chat.id === id) chat.messages = messages
                            return chat
                        })
                    }
                } else {
                    let { code, message } = data.error

                    if (code === 'invalid_offset') alert(message)
                    if (code === 'invalid_limit') alert(message)
                    if (code === 'invalid_access_token') alert(message)
                    if (code === 'dialogue_access_denied') alert(message)
                    if (code === 'version_not_found') alert(message)
                    if (code === 'dialogue_not_found') alert(message)
                    if (code === 'server_error') alert(message)
                }
            } else {
                this.chats.push({ id, messages: [] })
            }
        },
        removeUserChat(chatId) {
            this.chats = this.chats.filter(chat => chat.id !== chatId)
        },
        addMessagesInCurrentChat(chatId, messages) {
            this.chats = this.chats.map(chat => {
                if (chat.id === chatId) messages.forEach(message => chat.messages.push(message))
                return chat
            })
        }
    }
})