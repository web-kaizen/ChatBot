import { API_URL } from '@/constants/constants.js';
import ApiError from './ApiError.js';

export default class Message {

    getList(dialogueId, offset = 0, limit, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof offset !== 'number') ApiError.return('invalid_offset');
        if (typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let token = 'a9638f8ba36918524f7cf6091ce07802674834aa3f5d1968a2e4749b9d17c221';
        let url = `${API_URL}/dialogues/${dialogueId}/messages/`;

        if (limit) url += `?offset=${offset}&limit=${limit}`

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) ApiError.return('server_error');
                return response.json();
            })
            .then(data => callback(data));
    }

    send(dialogueId, message, botId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogue_id');
        if (typeof message !== 'string') ApiError.return('invalid_text');
        if (typeof botId !== 'number') ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let token = 'a9638f8ba36918524f7cf6091ce07802674834aa3f5d1968a2e4749b9d17c221';
        let url = `${API_URL}/dialogues/${dialogueId}/messages/`;

        fetch(url, {
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
            .then(response => {
                if (!response.ok) ApiError.return('server_error');
                return response.json();
            })
            .then(data => callback(data));
    }
}