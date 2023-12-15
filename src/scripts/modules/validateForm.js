import logIn from "./logIn";
import checkedCode from "./checkedCode";

const validateForm = (mode) => {
    const popupLogin = document.getElementById('popup-login');
    const loginAlertMsg = popupLogin.querySelector('.login-alert-msg');
    const formLogin = popupLogin.querySelector('.form-login');
    const inptsForm = formLogin.querySelectorAll('input');
    const inputEmail = formLogin.querySelector('#email');
    const inputPassword = formLogin.querySelector('#password');
    const inputConfirmPassword = formLogin.querySelector('#confirmPassword');

    let status = true;
    let deviceId = 'deviceId';
    let email;
    let password;
    let confirmPassword;

    const inputShowError = (input, text) => {
        input.parentElement.classList.add('invalid');
        input.nextElementSibling.textContent = text
        input.nextElementSibling.classList.add('open');
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    inptsForm.forEach(input => {
        if (!input.value.trim()) {
            if (input.dataset.inputName === 'email') {
                inputShowError(input, 'Заполните поле Email');
                status = false;
            } else if (input.dataset.inputName === 'password') {
                inputShowError(input, 'Заполните поле Пароль');
                status = false;
            } else if (input.dataset.inputName === 'confirmPassword' && mode === 'signUp') {
                inputShowError(input, 'Заполните поле Повторите пароль');
                status = false;
            }
        } else {
            if (input.dataset.inputName === 'email') {
                if (!validateEmail(input.value)) {
                    inputShowError(input, 'Электронная почта указана некорректно');
                    status = false;
                } else {
                    email = input.value
                }
            } else if (input.dataset.inputName === 'password') {
                password = input.value
            } else if (input.dataset.inputName === 'confirmPassword' && mode === 'signUp') {
                confirmPassword = input.value
            };
        };
    });

    if (mode === 'signIn' && email && password) {
        try {
            user.makeAuth(deviceId, logIn, email, password);
        } catch (error) {
            let json = JSON.parse(error.message);

            if (json.code === 'user_not_found') {
                inputShowError(inputEmail, json.text);
                inputShowError(inputPassword, '');
                inputPassword.value = '';
            }
            if (json.code === 'invalid_email') inputShowError(inputEmail, json.text);
            if (json.code === 'invalid_password') inputShowError(inputPassword, json.text);
            if (json.code === 'invalid_email_or_password') {
                inputShowError(inputEmail, '');
                inputShowError(inputPassword, '');
                loginAlertMsg.textContent = json.text
                loginAlertMsg.classList.add('show');
            };

            status = false;
        }
    } else if (mode === 'signUp' && email && password && confirmPassword) {
        try {
            user.makeReg(deviceId, checkedCode, email, password, confirmPassword);
        } catch (error) {
            let json = JSON.parse(error.message);

            if (json.code === 'invalid_email') inputShowError(inputEmail, json.text);
            if (json.code === 'invalid_password') inputShowError(inputPassword, json.text);
            if (json.code === 'invalid_confirm_password') inputShowError(inputConfirmPassword, json.text);
            if (json.code === 'invalid_passwords') {
                inputShowError(inputPassword, json.text);
                inputShowError(inputConfirmPassword, json.text);
            };
            if (json.code === 'email_busy') {
                inputShowError(inputEmail, json.text);
                inputPassword.value = '';
                inputConfirmPassword.value = '';
            }

            status = false;
        };
    };

    return status
}

export default validateForm;