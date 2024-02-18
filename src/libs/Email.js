import ApiError from './ApiError.js';
import Request from './Request.js';

export default class Email {
    check(callback) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'api/v0/users/email-verification/check/';

        Request.send(url, 'GET', (data) => callback(data));
    }

    resend(callback) {
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'api/v0/users/email-verification/resend/'

        Request.send(url, 'POST', (data) => callback(data));
    }

    verify(email, code, callback) {
        if (typeof email !== 'string') ApiError.return('invalid_email');
        if (typeof code !== 'number') ApiError.return('invalid_code');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'api/v0/users/email-verification/verify/';

        Request.send(url, 'POST', (data) => callback(data), { email, code });
    }
}