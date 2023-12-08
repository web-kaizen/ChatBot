const main = () => {
    const sidebar = document.querySelector('.sidebar');
    const viewSidebarBtn = sidebar.querySelector('.view-sidebar-btn');
    const viewSidebarList = sidebar.querySelector('.view-sidebar-list');
    const viewSidebarItems = sidebar.querySelectorAll('.view-sidebar-item');
    const popupLogin = document.getElementById('popup-login');
    const loginAlertMsg = popupLogin.querySelector('.login-alert-msg')
    const formLogin = popupLogin.querySelector('.form-login');
    const inptsForm = formLogin.querySelectorAll('input');
    const checkCodePopup = document.getElementById('popup-login-check');
    const checkAlert = checkCodePopup.querySelector('#alertMessageCode');
    const checkInput = checkCodePopup.querySelector('.check-input');
    const checkInfo = checkCodePopup.querySelector('.check-info');
    const checkTimer = checkCodePopup.querySelector('.check-info_timer');
    const checkLink = checkCodePopup.querySelector('.check-link');
    const checkBtn = checkCodePopup.querySelector('.check-button');

    let counterTimer = 60 * 2;                          // Two minutes
    let checkCode;
    let stopTimer = false;
    let newUser

    const changeLoginForm = (mode) => {
        const loginBtn = popupLogin.querySelector('#login-btn');
        const registBtn = popupLogin.querySelector('#regist-btn');
        const inputPassTwo = popupLogin.querySelector('.input-repeatPassword');
        const forgotPassBtn = popupLogin.querySelector('#forgot-password');
        const registLineBtn = popupLogin.querySelector('#registration');
        const haveAccountBtn = popupLogin.querySelector('#have-account');

        if (mode === 'signIn') {
            loginBtn.classList.remove('hide');
            forgotPassBtn.classList.remove('hide');
            registLineBtn.classList.remove('hide');
            loginAlertMsg.classList.remove('hide');

            registBtn.classList.add('hide');
            inputPassTwo.classList.add('hide');
            haveAccountBtn.classList.add('hide');
        } else if (mode === 'signUp') {
            loginBtn.classList.add('hide');
            forgotPassBtn.classList.add('hide');
            registLineBtn.classList.add('hide');
            loginAlertMsg.classList.add('hide');

            registBtn.classList.remove('hide');
            inputPassTwo.classList.remove('hide');
            haveAccountBtn.classList.remove('hide');
        };

        inptsForm.forEach(input => {
            resetInputs(input);
        });
    };

    const resetInputs = (input) => {
        loginAlertMsg.classList.remove('show');
        input.nextElementSibling.classList.remove('open');
        input.parentElement.classList.remove('invalid');
    };

    const loginOn = (email) => {
        const loginBlock = sidebar.querySelector('.user-login');
        const afterLoginBlock = sidebar.querySelector('.user-after-login');

        loginBlock.classList.add('hide');
        afterLoginBlock.classList.remove('hide');

        afterLoginBlock.querySelector('.user-logo').textContent = email.charAt(0).toUpperCase()
        afterLoginBlock.querySelector('.user-name').textContent = email
    };

    const loginOut = () => {
        const loginBlock = sidebar.querySelector('.user-login');
        const afterLoginBlock = sidebar.querySelector('.user-after-login');

        loginBlock.classList.remove('hide');
        afterLoginBlock.classList.add('hide');

        afterLoginBlock.querySelector('.user-logo').textContent = '';
        afterLoginBlock.querySelector('.user-name').textContent = '';
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validationForm = (mode) => {
        let email;
        let password;
        let repeatPassword;

        inptsForm.forEach(input => {
            if (!input.value.trim()) {
                switch (input.dataset.inputName) {
                    case 'email':
                        input.nextElementSibling.textContent = 'Заполните поле Email'
                        break;
                    case 'password':
                        input.nextElementSibling.textContent = 'Заполните поле Пароль'
                        break;
                    case 'repeatPassword':
                        input.nextElementSibling.textContent = 'Заполните поле Повторите пароль'
                        break;
                    default:
                        input.nextElementSibling.textContent = 'Заполните поле'
                        break;
                };
                input.nextElementSibling.classList.add('open');
                input.parentElement.classList.add('invalid');
            } else {
                switch (input.id) {
                    case 'email':
                        if (!validateEmail(input.value)) {
                            input.nextElementSibling.textContent = 'Электронная почта указана некорректно'
                            input.nextElementSibling.classList.add('open');
                            input.parentElement.classList.add('invalid');
                        } else {
                            email = input.value
                        }
                        break;
                    case 'password':
                        password = input.value
                        break;
                    case 'repeatPassword':
                        repeatPassword = input.value
                        break;
                };
            };
        });

        if (mode === 'signIn' && email && password) {
            /*
                Сделать запрос к БД с users и проверить почту и пароль на корректность.
                Если есть пользователь в БД и пароль совпадает -> Вход
                Если есть пользователь в БД или пароль неверный -> Ошибка об некорректном пароле и почте
            */

            //  Заглушка:
            if (email === "admin@admin.ru" && password === "admin") {
                popupLogin.classList.add('hide');
                formLogin.reset();
                loginOn(email);

                return { email, password }
            } else {
                loginAlertMsg.classList.add('show');
                inptsForm.forEach(input => {
                    input.parentElement.classList.add('invalid');
                });
            }
        } else if (mode === 'signUp' && email && password && repeatPassword) {
            /*  Сделать запрос к БД с users и проверить почту.
                Если пользователь уже зарегистрирован -> Ошибка, что пользователь существует
                Если указанные пароли не совпадают -> Ошибка, что пароли не совпадают
            */

            //  Заглушка:
            if (email === "admin@admin.ru") {
                inptsForm.forEach(input => {
                    input.parentElement.classList.add('invalid');
                    if (input.type === 'email') {
                        input.nextElementSibling.textContent = 'Указанный пользователь уже зарегистрирован'
                        input.nextElementSibling.classList.add('open');
                    };
                    if (input.type === 'password') {
                        input.value = '';
                    };
                });
            } else if (password !== repeatPassword) {
                inptsForm.forEach(input => {
                    if (input.type === 'password') {
                        input.nextElementSibling.textContent = 'Пароли не совпадают'
                        input.nextElementSibling.classList.add('open');
                        input.parentElement.classList.add('invalid');
                    };
                });
            } else {
                popupLogin.classList.add('hide');
                checkRegistrationCode(email);

                return { email, password, repeatPassword }
            }
        };
    };

    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;

        checkInfo.style.display = '';
        checkLink.style.display = '';

        let idInterval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;

            if (--timer < 0 || stopTimer) {
                checkInfo.style.display = 'none';
                display.textContent = ''
                checkLink.style.display = 'block';

                clearInterval(idInterval);
            }
        }, 1000);
    };

    const sendCheckCode = (email) => {
        const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        stopTimer = false;

        /* Реализовать отправку кода на указанный email */

        startTimer(counterTimer, checkTimer);

        return code;
    };

    const checkRegistrationCode = (email) => {
        const checkTitle = checkCodePopup.querySelector('.check-title-text');

        checkCode = sendCheckCode(email);

        checkCodePopup.classList.remove('hide');
        checkTitle.textContent = `Отправили код на ${email}`;
    };

    sidebar.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.closest('.user-login-btn')) {
            popupLogin.classList.remove('hide');
        };
        if (e.target.closest('.view-sidebar-btn')) {
            viewSidebarList.classList.add('show');
        };
        if (e.target.closest('.view-sidebar-left')) {
            sidebar.style.order = '';
            viewSidebarBtn.classList.remove('right');
            viewSidebarList.classList.remove('show');
            viewSidebarItems.forEach(item => item.classList.toggle('active'))
        };
        if (e.target.closest('.view-sidebar-right')) {
            sidebar.style.order = '1';
            viewSidebarBtn.classList.add('right');
            viewSidebarList.classList.remove('show');
            viewSidebarItems.forEach(item => item.classList.toggle('active'))
        };
        if (e.target.closest('.user-balance-update')) {
            /* Кнопка "Обновить" баланс */
        };
        if (e.target.closest('.topup-balance')) {
            /* Кнопка "Пополнить" баланс */
        };
        if (e.target.closest('.user-logout')) {
            loginOut();
        };
    })

    popupLogin.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.closest('.popup-close')) {
            popupLogin.classList.add('hide');
            changeLoginForm('signIn');
            formLogin.reset();
        };
        if (e.target.closest('#forgot-password')) {
            /* Необходимо описать функционал, когда забыл пароль! */
            popupLogin.classList.add('hide');
            changeLoginForm('signIn');
            formLogin.reset();
        };
        if (e.target.closest('#registration')) {
            changeLoginForm('signUp');
        };
        if (e.target.closest('#have-account')) {
            changeLoginForm('signIn');
        };
        if (e.target.closest('#login-btn')) {
            newUser = validationForm('signIn');
        };
        if (e.target.closest('#regist-btn')) {
            newUser = validationForm('signUp');
        };
    });

    inptsForm.forEach(input => {
        input.addEventListener('input', () => {
            resetInputs(input);
        });
    });

    checkInput.addEventListener('input', (e) => {
        checkAlert.classList.remove("open");
        checkInput.classList.remove("invalid");

        e.target.value = e.target.value.replace(/\D+/g, '')
    });

    checkLink.addEventListener('click', (e) => {
        e.preventDefault();

        checkCode = sendCheckCode(email);
    });

    checkBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (checkInput.value) {
            /// Заменить 1111 на checkCode
            if (parseInt(checkInput.value) === 1111) {
                formLogin.reset();
                checkInput.value = '';
                stopTimer = true;
                loginOn(newUser.email);
                changeLoginForm('signIn');
                checkCodePopup.classList.add('hide');
            } else {
                checkAlert.textContent = 'Неверный код';
                checkAlert.classList.add("open");
                checkInput.classList.add("invalid");
            }
        } else {
            checkAlert.textContent = 'Введите код';
            checkAlert.classList.add("open");
            checkInput.classList.add("invalid");
        }
    })
};

export default main;