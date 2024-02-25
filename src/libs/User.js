import ApiError from './ApiError.js';
import Request from './Request.js';

export default class User {
    makeReg(callback, email = undefined, password = undefined, confirmPassword = undefined) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');
        if (password !== confirmPassword) ApiError.return('invalid_passwords');

        Request.send('api/v0/users/', 'POST', (data) => {
            if (Object.prototype.hasOwnProperty.call(data, 'user_id')) {
                callback({ email });
            }
        }, { email, password });
    }

    makeAuth(callback, email = undefined, password = undefined) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        Request.send('api/v0/users/login/', 'POST', (data) => {
            if (Object.prototype.hasOwnProperty.call(data, 'user_id')) {
                const user_id = data['user_id'];
                callback({ email, user_id });
            }
        }, { email, password });
    }

    logout(callback) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        const token = this.getAccessToken();
        const url = Request.getProxyURL();

        fetch(`${url}api/v0/users/logout/`, {
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