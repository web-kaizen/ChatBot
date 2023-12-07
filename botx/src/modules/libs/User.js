import ApiError from './ApiError.js';

export default class User {
    makeReg(deviceId, email = undefined, password = undefined, confirmPassword = undefined, callback = undefined) {
        if (typeof deviceId !== 'string') ApiError.return('invalid_device_id');
        if (callback && typeof callback !== 'function') ApiError.return('invalid_callback');

        let user = JSON.parse(localStorage.getItem('user')) || {};

        if (email && password && confirmPassword) {
            if (typeof email !== 'string') ApiError.return('invalid_email');
            if (typeof password !== 'string') ApiError.return('invalid_password');
            if (typeof confirmPassword !== 'string') ApiError.return('invalid_confirm_password');
            if (password !== confirmPassword) ApiError.return('invalid_passwords');

            user = { email: email, password: password };
        }

        user.deviceId = deviceId;

        localStorage.setItem('user', JSON.stringify(user));

        if (callback) callback(user);
    }

    makeAuth(deviceId, email = undefined, password = undefined, callback = undefined) {
        if (typeof deviceId !== 'string') ApiError.return('invalid_device_id');
        if (callback && typeof callback !== 'function') ApiError.return('invalid_callback');

        let user = JSON.parse(localStorage.getItem('user')) || {};
        if (Object.keys(user).length === 0) ApiError.return('user_not_found');

        if (email && password) {
            if (typeof email !== 'string') ApiError.return('invalid_email');
            if (typeof password !== 'string') ApiError.return('invalid_password');
            if (user.email !== email || user.password !== password) ApiError.return('invalid_email_or_password');

            let alphabet = 'qwertyuiopasdfghjklzxcvbnm';
            let token = '';

            for (let i = 0; i < 30; i++) {
                token += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
            }

            user.authToken = token;
        }

        localStorage.setItem('user', JSON.stringify(user));

        if (callback) callback(user);
    }

    logout(callback = undefined) {
        if (callback && typeof callback !== 'function') ApiError.return('invalid_callback');

        let user = JSON.parse(localStorage.getItem('user')) || {};
        let status = false;

        if ('authToken' in user) {
            delete user['authToken'];
            status = true;
        }

        localStorage.setItem('user', JSON.stringify(user));

        if (callback) callback(status);
    }
}