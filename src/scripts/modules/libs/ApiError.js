export default class ApiError {
    static errorList = {
        'invalid_device_id': 'Невалидный deviceId',
        'invalid_callback': 'Невалидный callback',
        'invalid_email': 'Неверный электронный адрес',
        'invalid_password': 'Неверный пароль',
        'invalid_email_or_password': 'Неверный электронный адрес или пароль',
        'invalid_confirm_password': 'Неверный пароль подтверждения',
        'invalid_passwords': 'Пароли не совпадают',
        'user_not_found': 'Пользователь не найден',
        'email_busy': 'Электронный адрес занят',
        'server_error': 'Internal server error',
    };

    static return(code) {
        let message = this.errorList[code] || null;

        if (message === null) {
            code = 'unknown_error';
            message = 'Unknown error';
        }

        throw new Error(JSON.stringify({ text: message, code: code }));
    }
}