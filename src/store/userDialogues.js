import Request from '@/libs/Request'
import { defineStore } from 'pinia'

export const userDialoguesStore = defineStore('userDialogues', {
    state: () => {
        return {
            dialogues: [],
        }
    },
    getters: {
        getDialogues(state) {
            return state.dialogues
        },

        getDialogueById(state) {
            return (dialogueId) => {
                return state.dialogues.find(dialogue => dialogue.id === dialogueId)
            }
        }
    },
    actions: {
        getDialoguesFromApi() {
            Request.send('api/v0/dialogues/', 'GET', (data) => {
                this.setDialogues(data)
            });
        },

        getDialoguesByIdFromApi(id) {
            Request.send(`api/v0/dialogues/${id}/`, 'GET', (data) => {
                this.addDialogue(data)
            });
        },

        setDialogues(dialogues) {
            this.dialogues = dialogues
        },

        addDialogue(dialogue) {
            this.dialogues.push(dialogue)
        },

        createNewDialogue(name, bot_id) {
            return new Promise((resolve, reject) => {
                Request.send('api/v0/dialogues/', 'POST', (data) => {
                    if (data.id) {
                        this.getDialoguesByIdFromApi(data.id)
                        resolve(data.id);
                    } else {
                        reject(new Error('Failed to create dialogue. No id returned.'));
                    }
                }, { name, bot_id });
            });
        }
    }
})