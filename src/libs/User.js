import ApiError from './ApiError.js';

// TODO: заменить потом на проксю Максима
const URL_PROXY = 'http://85.215.65.210:8081/api/v0/';

export default class User {
    makeReg(callback, email = undefined, password = undefined, confirmPassword = undefined) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');
        if (password !== confirmPassword) ApiError.return('invalid_passwords');

        fetch(`${URL_PROXY}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
            .then(async function (response) {
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => {
                if (Object.prototype.hasOwnProperty.call(data, 'user_id')) {
                    callback({ email, password });
                }
            });
    }

    makeAuth(callback, email = undefined, password = undefined) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        fetch(`${URL_PROXY}users/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
            .then(async function (response) {
                let json = await response.json();
                if ('result' in json) {
                    return json['result']
                } else if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
            .then(data => {
                if (Object.prototype.hasOwnProperty.call(data, 'user_id')) {
                    localStorage.setItem('accessToken', JSON.stringify(data['access_token'] || ''));
                    callback({ email, password });
                }
            });
    }

    logout(callback) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        const token = this.getAccessToken();

        fetch(`${URL_PROXY}users/logout/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(async function (response) {
                if (response.status === 204) {
                    localStorage.removeItem('accessToken');
                    callback(true);
                    return
                }
                let json = await response.json();
                if ('error' in json) {
                    ApiError.return(json['error']['code'])
                }
            })
    }

    getAccessToken() {
        return localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : ''
    }
}