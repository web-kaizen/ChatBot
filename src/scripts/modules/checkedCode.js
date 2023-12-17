import changeForms from "./changeForms";
import logIn from "./logIn";

const checkedCode = (user) => {
    const popupLogin = document.getElementById('popup-login');
    const checkCodePopup = document.getElementById('popup-login-check');
    const checkTitle = checkCodePopup.querySelector('.check-title-text');
    const checkAlert = checkCodePopup.querySelector('#alertMessageCode');
    const checkInput = checkCodePopup.querySelector('.check-input');
    const checkInfo = checkCodePopup.querySelector('.check-info');
    const checkTimer = checkCodePopup.querySelector('.check-info_timer');
    const checkLink = checkCodePopup.querySelector('.check-link');
    const checkBtn = checkCodePopup.querySelector('.check-button');

    const email = user.email;

    let counterTimer = 60 * 2;                          // Two minutes
    let stopTimer = false;
    let checkCode;

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
        console.log(email);

        startTimer(counterTimer, checkTimer);

        return code;
    };

    checkCode = sendCheckCode(email);
    checkCodePopup.classList.remove('hide');
    checkTitle.textContent = `Отправили код на ${email}`;

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
                checkInput.value = '';
                stopTimer = true;
                changeForms('signIn');
                checkCodePopup.classList.add('hide');
                popupLogin.classList.remove('hide');
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

export default checkedCode;