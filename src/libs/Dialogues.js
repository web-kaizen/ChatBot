import ApiError from './ApiError.js';
import { URL_PROXY } from '/src/constants/constants.js'


export default class Dialogues {
    getList(token, offset = undefined, limit = undefined, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token')
        if (offset && typeof offset !== 'number') ApiError.return('invalid_offset');
        if (limit && typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/'

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return null
                }
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    create(token, name, botId, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token')
        if (typeof name !== 'string') ApiError.return('invalid_name');
        if (!(typeof botId === 'number' || Array.isArray(botId))) ApiError.return('invalid_botId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/'

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    getById(token, dialogueId, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token')
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/' + dialogueId + '/'

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    optUpdateById(token, dialogueId, name, botId, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token')
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof name !== 'string') ApiError.return('invalid_name');
        if (!(typeof botId === 'number' || Array.isArray(botId))) ApiError.return('invalid_botId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/' + dialogueId + '/'

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return null
                }
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    updateById(token, dialogueId, name, botId, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token')
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof name !== 'string') ApiError.return('invalid_name');
        if (!(typeof botId === 'number' || Array.isArray(botId))) ApiError.return('invalid_botId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/' + dialogueId + '/'

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return null
                }
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    delById(token, dialogueId, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token')
        if (typeof dialogueId !== 'number') ApiError.return('invalid_dialogueId');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/' + dialogueId + '/'

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return null
                }
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }
}