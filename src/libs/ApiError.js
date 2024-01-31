export default class ApiError {
    static errorList = {
        'invalid_device_id': 'Невалидный deviceId',
        'invalid_callback': 'Невалидный callback',
        'invalid_email': 'Неверный электронный адрес',
        'invalid_password': 'Неверный пароль',
        'invalid_email_or_password': 'Неверный электронный адрес или пароль',
        'invalid_confirm_password': 'Неверный пароль подтверждения',
        'invalid_passwords': 'Пароли не совпадают',
        'invalid_access_token': 'Невалидный токен',
        'version_not_found': 'Версия не найдена',
        'application_not_found': 'Приложение не найдено',
        'invalid_code': 'Невалидный код',
        'user_not_found': 'Пользователь не найден',
        'email_busy': 'Электронный адрес занят',
        'invalid_offset': 'Невалидный offset',
        'invalid_limit': 'Невалидный limit',
        'invalid_name': 'Невалидное значение имени',
        'invalid_bot_id': 'Невалидный идентификатор бота',
        'invalid_access_token': 'Невалидный токен',
        'bot_not_found': 'Бот не найден',
        'bot_version_conflict': 'Идентификаторы ботов одной версии',
        'dialogue_access_denied': 'Доступ к диалогу запрещён',
        'dialogue_not_found': 'Диалог не найден',
        'bot_error': 'Отсутствуют старые идентификаторы ботов',
        'version_not_found': 'Версия не найдена',
        'application_not_found': 'Приложение не найдено',
        'server_error': 'Внутренняя ошибка сервера'
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