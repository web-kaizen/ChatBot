import ApiError from './ApiError.js';
import { URL_PROXY_NIKITA } from '/src/constants/constants.js'

export default class Email {
    check(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY_NIKITA + '/api/v0/users/email-verification/check'

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
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

    resend(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY_NIKITA + '/api/v0/users/email-verification/resend'

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                if (response.status === 204) {
                    return { "status": true, "ttl": 120 };
                }
                let json = await response.json();
                if (json['error']['status'] === 429) {
                    return { "status": false, "ttl": json['error']['delay'] };
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => callback(data));
    }

    verify(token, email, code, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_access_token');
        if (typeof email !== 'string') ApiError.return('invalid_email');
        if (typeof code !== 'number') ApiError.return('invalid_code');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY_NIKITA + '/api/v0/users/email-verification/verify'

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
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
const callback = (obj) => {
    console.log(obj);
};

let email = new Email()
let token = '4380b2fa47e846605bb248d410dae4b069a808c22a17d9f3acf767deea3ffe18'

// email.check(token, callback)
email.resend(token, callback)
// email.verify(token, 'evgcursed@gmail.com', 2, callback)