import validateForm from "./validateForm";
import changeForms from "./changeForms";

const popupLogin = () => {
    const popupLogin = document.getElementById('popup-login');
    const loginAlertMsg = popupLogin.querySelector('.login-alert-msg');
    const formLogin = popupLogin.querySelector('.form-login');
    const inptsForm = formLogin.querySelectorAll('input');

    const closePopup = () => {
        popupLogin.classList.add('hide');
        changeForms('signIn');
        formLogin.reset();
    }

    const resetInputs = (input) => {
        loginAlertMsg.classList.remove('show');
        input.nextElementSibling.classList.remove('open');
        input.parentElement.classList.remove('invalid');
    };

    popupLogin.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.closest('.popup-close')) {
            closePopup();
        };
        if (e.target.closest('#forgot-password')) {
            /* Необходимо описать функционал, когда забыл пароль! */
            closePopup();
        };
        if (e.target.closest('#registration')) changeForms('signUp');
        if (e.target.closest('#have-account')) changeForms('signIn');
        if (e.target.closest('#login-btn')) {
            if (validateForm('signIn')) {
                closePopup();
            }
        }
        if (e.target.closest('#regist-btn')) {
            if (validateForm('signUp')) {
                closePopup();
            }
        }
    });

    inptsForm.forEach(input => {
        input.addEventListener('input', () => {
            resetInputs(input);
        });
    });

};

export default popupLogin;