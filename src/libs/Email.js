import ApiError from './ApiError.js';

export default class Email {
    check(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'http://85.215.65.210:8081/api/v0/users/email-verification/check'

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Результат (200)')
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error('Ошибка авторизации (401)')
                } else if (response.status === 404) {
                    throw new Error('Не удалось найти данные (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    console.log('Без статуса хз..')
                }
            })
            .then(data => callback(data))
            .catch(error => console.log(error));
    }
    resend(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'http://85.215.65.210:8081/api/v0/users/email-verification/resend'

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async function(response) {
                let status = response.status
                if (status === 204) {
                    return {
                        "status": true,
                        "ttl": 120
                    }
                } else if (status === 401) {
                    throw new Error('Ошибка авторизации (401)')
                } else if (status === 429) {
                    let json = await response.json();
                    return {
                        "status": true,
                        "ttl": json['error']['delay']
                    }
                } else if (status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    console.log('Без статуса хз..')
                }
            })
            .then(data => callback(data))

    }
    verify(token, email, code, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof email !== 'string') ApiError.return('invalid_email');
        if (typeof code !== 'number') ApiError.return('invalid_code');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');
    }
}
const myCallback = (value) => {
    console.log(value)
};

let email = new Email()
let token = '869539d6ca02ae7a90593fa2392e2422dfd2546052b7a6b7ffa3b85f185a6e9d'
let email2 = 'evgcursed@gmail.com'
let code = 12345

// console.log('Method: check (working)')
// email.check(token, myCallback)

console.log('Method: resend (проблема: много отправил запросов и сервер перестал отвечать => (не затестировал метод)')
email.resend(token, myCallback)

// console.log('Method: verify')
// email.verify(token, email2, code, myCallback)
