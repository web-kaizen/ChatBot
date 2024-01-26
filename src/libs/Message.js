import { API_URL } from '@/constants/constants.js';
import ApiError from './ApiError.js';

export default class Message {

    async getList(dialogueId, offset = 0, limit = undefined, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof offset !== 'number') ApiError.return('invalid_offset');
        if (limit && typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let token = 'a9638f8ba36918524f7cf6091ce07802674834aa3f5d1968a2e4749b9d17c221';
        let url = `${API_URL}/dialogues/${dialogueId}/messages/`;

        if (limit) url += `?offset=${offset}&limit=${limit}`

        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error
            })
            .then(data => callback(data));
    }

    async send(dialogueId, message, botId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof message !== 'string') ApiError.return('invalid_text');
        if (typeof botId !== 'number') ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let token = 'a9638f8ba36918524f7cf6091ce07802674834aa3f5d1968a2e4749b9d17c221';
        let url = `${API_URL}/dialogues/${dialogueId}/messages/`;

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
            .then(res => {
                if (res.ok) return res.json();
                throw new Error
            })
            .then(data => callback(data));
    }
}