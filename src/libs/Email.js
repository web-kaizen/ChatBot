import ApiError from './ApiError.js';

export default class Email {
    check(token, callback) {
        if (typeof token !== 'string') ApiError.return('invalid_token');
        if (typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = 'http://core.webstktw.beget.tech/api/v0/apps/2750bc42-702e-4cbe-bae5-798f171389e1/users/email-verification/check'

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
}
const myCallback = (value) => {
    console.log("Значение:", value);
};

let email = new Email()
let token = 'fc1ff79a3cec2f38aea005998b9c9d4ba73f01522773f2722791c4a8fa986849'

email.check(token, myCallback)
