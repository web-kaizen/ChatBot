import ApiError from './ApiError.js';
import { URL_PROXY } from '/src/constants/constants.js'


export default class Dialogues {
    get(offset = undefined, limit = undefined, callback) {
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
                let json = await response.json();
                if ('result' in json) {
                    return json
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }
}

function callback(result) {
    console.log(result); // Вывод результата в консоль
}
let token = ''

let dialogues = new Dialogues()
dialogues.get(0, 0, callback)