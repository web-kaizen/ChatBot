import ApiError from './ApiError.js';
import { URL_PROXY } from '/src/constants/constants.js'


export default class Dialogues {
    get(offset = undefined, limit = undefined, callback) {
        if (offset && typeof offset !== 'number') ApiError.return('invalid_offset');
        if (limit && typeof limit !== 'number') ApiError.return('invalid_limit');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/dialogues/'
        // let url = 'http://85.215.65.210:8080/api/v0/dialogues/'

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                let json = await response.json();
                if ('result' in json) {
                    return json
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    make(name, botId, callback) {
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
                    return json
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    getById(dialogueId, callback) {
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
                    return json
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    optUpdateById(dialogueId, name, botId, callback) {

    }
}

function callback(result) {
    console.log(result); // Вывод результата в консоль
}
let token = '27b71028293f56d0f851cab13264809691dcddd1fd3439e626565f1f40f0df1f'

let dialogues = new Dialogues()
// dialogues.get(0, 0, callback) //работает
// dialogues.make('gpt-4-8k', 1, callback) //invalid name
// dialogues.getById(30, callback)
// dialogues.