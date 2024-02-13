import { URL_PROXY } from '@/constants/constants.js';
import ApiError from './ApiError.js';
import User from './User.js';
import { newChat } from '@/store/chat.js';

const user = new User()

export default class Message {
    token = user.getAccessToken();
    activeChat = newChat()

    async getList(dialogueId, offset = 0, limit = undefined, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof offset !== 'number') ApiError.return('invalid_offset');
        if (limit && typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let token = this.token;
        let url = `${URL_PROXY}api/v0/dialogues/${dialogueId}/messages/`;

        if (limit) url += `?offset=${offset}&limit=${limit}`

        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(async (res) => {
                if (res.status === 204) return null
                let json = await res.json();
                if ('result' in json) {
                    return json
                } else if ('error' in json) {
                    return { error: ApiError.get(json['error']['code']) }
                }
            })
            .then(data => callback(data))
    }

    async send(dialogueId, message, botId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof message !== 'string') ApiError.return('invalid_text');
        if (typeof botId !== 'number') ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let token = this.token;
        let url = `${URL_PROXY}api/v0/dialogues/${dialogueId}/messages/`;

        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                text: message,
                bot_id: botId
            })
        })
            .then(async (res) => {
                let json = await res.json();
                if ('result' in json) {
                    return json
                } else if ('error' in json) {
                    return { error: ApiError.get(json['error']['code']) }
                }

            })
            .then(data => callback(data))
    }

    handleErrorChat = (text) => {
        this.activeChat.toggleError(true)
        this.activeChat.changeTextError(text)
    }

    handleApiError({ text, code }) {
        if (code === 'rate_limit_exceeded') this.handleErrorChat(text)
        if (code === 'context_limit_exceeded') this.handleErrorChat(text)
        if (code === 'insufficient_quota') this.handleErrorChat(text)

        if (code === 'invalid_offset') alert(text)
        if (code === 'invalid_limit') alert(text)
        if (code === 'invalid_text') alert(text)
        if (code === 'invalid_bot_id') alert(text)
        if (code === 'invalid_access_token') alert(text)
        if (code === 'dialogue_access_denied') alert(text)
        if (code === 'version_not_found') alert(text)
        if (code === 'application_not_found') alert(text)
        if (code === 'dialogue_not_found') alert(text)
        if (code === 'bot_not_found') alert(text)
        if (code === 'server_error') alert(text)
        if (code === 'dialogue_access_denied') alert(text)
    }
}