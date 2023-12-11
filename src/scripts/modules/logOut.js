const logOut = () => {
    const sidebar = document.querySelector('.sidebar');
    const loginBlock = sidebar.querySelector('.user-login');
    const afterLoginBlock = sidebar.querySelector('.user-after-login');

    loginBlock.classList.remove('hide');
    afterLoginBlock.classList.add('hide');

    afterLoginBlock.querySelector('.user-logo').textContent = '';
    afterLoginBlock.querySelector('.user-name').textContent = '';
};

export default logOut;