const changeForms = (mode) => {
    const popupLogin = document.getElementById('popup-login');
    const loginAlertMsg = popupLogin.querySelector('.login-alert-msg');
    const loginBtn = popupLogin.querySelector('#login-btn');
    const registBtn = popupLogin.querySelector('#regist-btn');
    const inputPassTwo = popupLogin.querySelector('.input-repeatPassword');
    const forgotPassBtn = popupLogin.querySelector('#forgot-password');
    const registLineBtn = popupLogin.querySelector('#registration');
    const haveAccountBtn = popupLogin.querySelector('#have-account');
    const inptsForm = popupLogin.querySelectorAll('input');

    const resetInputs = (input) => {
        loginAlertMsg.classList.remove('show');
        input.nextElementSibling.classList.remove('open');
        input.parentElement.classList.remove('invalid');
    };

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

export default changeForms;