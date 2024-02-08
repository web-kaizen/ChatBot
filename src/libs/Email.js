import ApiError from './ApiError.js';
import { URL_PROXY } from '/src/constants/constants.js'

export default class Email {
    check(callback) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/users/email-verification/check/'

        fetch(url, {
            method: 'GET'
        })
            .then(async function(response) {
                let json = await response.json();
                if ('result' in json) {
                    return { "status": json['result']['status'] }
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    resend(callback) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/users/email-verification/resend/'

        fetch(url, {
            method: 'POST'
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return { "status": true, "ttl": 120 };
                }
                let json = await response.json();
                if (json['error']['code'] === 'rate_limit_exceeded') {
                    return { "status": false, "ttl": json['error']['delay'] };
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    verify(email, code, callback) {
        if (typeof email !== 'string') ApiError.return('invalid_email');
        if (typeof code !== 'number') ApiError.return('invalid_code');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/users/email-verification/verify/'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'code': code
            })
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return { "status": true };
                }
                let json = await response.json();
                if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }
}