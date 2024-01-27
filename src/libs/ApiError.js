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
        'dialogue_not_found': 'Диалог не найден',
        'dialogue_access_denied': 'Доступ к диалогу запрещён',
        'invalid_offset': 'Некорректное значение смещения',
        'invalid_limit': 'Некорректное значение лимита',
        'invalid_access_token': 'Неверный токен доступа',
        'version_not_found': 'Версия не найдена',
        'application_not_found': 'Приложение не найдено',
        'invalid_text': 'Невалидный текст сообщения',
        'invalid_bot_id': 'Невалидный идентификатор бота',
        'bot_not_found': 'Бот не найден',
        'rate_limit_exceeded': 'Извините, но ваш запрос превышает лимит запросов. Можете создать новый диалог, чтобы продолжить общение по этой теме. Вот ссылка, чтобы начать новый диалог: создать новый чат.',
        'context_limit_exceeded': 'Извините, но ваш запрос превышает лимит символов. Можете создать новый диалог, чтобы продолжить общение по этой теме. Вот ссылка, чтобы начать новый диалог: создать новый чат.',
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