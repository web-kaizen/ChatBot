import ApiError from './ApiError.js';

export default class Email {
    check(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');
    }
}