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
        'dialogue_not_found': 'Dialogue not found',
        'dialogue_access_denied': 'Dialogue access denied',
        'invalid_offset': 'Incorrect parameter: offset',
        'invalid_limit': 'Incorrect parameter: limit',
        'invalid_access_token': 'Invalid access token',
        'version_not_found': 'Version not found',
        'application_not_found': 'Application not found',
        'invalid_text': 'Invalid parameter: text',
        'invalid_bot_id': 'Invalid parameter: bot_id',
        'bot_not_found': 'Bot not found',
        'rate_limit_exceeded': 'Превышен лимит запросов',
        'context_limit_exceeded': 'Превышен предельный лимит контекста',
        'insufficient_quota': 'Превышена квота'
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