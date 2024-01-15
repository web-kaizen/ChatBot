import ApiError from './ApiError.js';

export default class Email {
    check(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'http://85.215.65.210:8081/api/v0/users/email-verification/check';

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                let status = response.status;
                if (status === 200) {
                    return {
                        "status": true
                    };
                } else if (status === 401) {
                    ApiError.return('invalid_access_token');
                } else if (status === 404) {
                    let json = await response.json();
                    if (json['error']['code'] === 'version_not_found') {
                        ApiError.return('version_not_found');
                    } else if (json['error']['code'] === 'application_not_found') {
                        ApiError.return('application_not_found');
                    }
                } else if (status === 500) {
                    ApiError.return('server_error');
                }
            })
            .then(data => callback(data));
    }

    resend(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'http://85.215.65.210:8081/api/v0/users/email-verification/resend';

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                let status = response.status;
                if (status === 204) {
                    return {
                        "status": true,
                        "ttl": 120
                    };
                } else if (status === 401) {
                    ApiError.return('invalid_access_token');
                } else if (status === 429) {
                    let json = await response.json();
                    return {
                        "status": false,
                        "ttl": json['error']['delay']
                    };
                } else if (status === 500) {
                    ApiError.return('server_error');
                }
            })
            .then(data => callback(data));
    }

    verify(token, email, code, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof email !== 'string') ApiError.return('invalid_email');
        if (typeof code !== 'number') ApiError.return('invalid_code');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'http://85.215.65.210:8081/api/v0/users/email-verification/verify';

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
                let status = response.status;
                if (status === 204) {
                    return {
                        "status": true,
                        "ttl": 120
                    };
                } else if (status === 400) {
                    let json = await response.json();
                    if (json['error']['code'] === 'invalid_code') {
                        ApiError.return('invalid_code');
                    } else if (json['error']['code'] === 'invalid_email') {
                        ApiError.return('invalid_email');
                    }
                } else if (status === 401) {
                    ApiError.return('invalid_access_token');
                } else if (status === 403) {
                    ApiError.return('email_access_denied');
                } else if (status === 404) {
                    let json = await response.json();
                    if (json['error']['code'] === 'version_not_found') {
                        ApiError.return('version_not_found');
                    } else if (json['error']['code'] === 'application_not_found') {
                        ApiError.return('application_not_found');
                    }
                } else if (status === 500) {
                    ApiError.return('server_error');
                }
            })
            .then(data => callback(data));
    }
}
