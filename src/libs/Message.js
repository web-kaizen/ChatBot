import Request from './Request.js';
import ApiError from './ApiError.js';
import { newChat } from '@/store/chat.js';

export default class Message {
    activeChat = newChat()

    getList(dialogueId, offset = 0, limit = undefined, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof offset !== 'number') ApiError.return('invalid_offset');
        if (limit && typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = `api/v0/dialogues/${dialogueId}/messages/`;
        if (limit) url += `?offset=${offset}&limit=${limit}`

        Request.send(url, 'GET', (data) => callback(data));
    }

    send(dialogueId, message, botId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof message !== 'string') ApiError.return('invalid_text');
        if (typeof botId !== 'number') ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = `api/v0/dialogues/${dialogueId}/messages/`;

        Request.send(url, 'POST', (data) => callback(data), { text: message, bot_id: botId });
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