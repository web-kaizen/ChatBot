import ApiError from './ApiError.js';
import Request from './Request.js';

export default class Dialogues {
    getList(offset = 0, limit = undefined, callback) {
        if (offset && typeof offset !== 'number') ApiError.return('invalid_offset');
        if (limit && typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'api/v0/dialogues/'
        if (limit) url += `?offset=${offset}&limit=${limit}`

        Request.send(url, 'GET', (data) => callback(data));
    }

    create(name, botId, callback) {
        if (typeof name !== 'string') ApiError.return('invalid_name');
        if (!(typeof botId === 'number' || Array.isArray(botId))) ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'api/v0/dialogues/'

        Request.send(url, 'POST', (data) => callback(data), { name: name, bot_id: botId });
    }

    getById(dialogueId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = `api/v0/dialogues/${dialogueId}/`

        Request.send(url, 'GET', (data) => callback(data));
    }

    optUpdateById(dialogueId, name, botId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof name !== 'string') ApiError.return('invalid_name');
        if (!(typeof botId === 'number' || Array.isArray(botId))) ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = `api/v0/dialogues/${dialogueId}/`

        Request.send(url, 'PATCH', (data) => callback(data), { name: name, bot_id: botId });
    }

    updateById(dialogueId, name, botId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof name !== 'string') ApiError.return('invalid_name');
        if (!(typeof botId === 'number' || Array.isArray(botId))) ApiError.return('invalid_bot_id');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = `api/v0/dialogues/${dialogueId}/`

        Request.send(url, 'PUT', (data) => callback(data), { name: name, bot_id: botId });
    }

    delById(dialogueId, callback) {
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = `api/v0/dialogues/${dialogueId}/`

        Request.send(url, 'DELETE', (data) => callback(data));
    }
}