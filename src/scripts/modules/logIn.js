const logIn = (user) => {
    const sidebar = document.querySelector('.sidebar');
    const loginBlock = sidebar.querySelector('.user-login');
    const afterLoginBlock = sidebar.querySelector('.user-after-login');

    const email = user.email;

    loginBlock.classList.add('hide');
    afterLoginBlock.classList.remove('hide');

    afterLoginBlock.querySelector('.user-logo').textContent = email.charAt(0).toUpperCase()
    afterLoginBlock.querySelector('.user-name').textContent = email
};

export default logIn;