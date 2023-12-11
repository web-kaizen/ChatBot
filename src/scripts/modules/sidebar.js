import logOut from "./logOut";

const sidebar = () => {
    const popupLogin = document.getElementById('popup-login');
    const sidebar = document.querySelector('.sidebar');
    const viewSidebarBtn = sidebar.querySelector('.view-sidebar-btn');
    const viewSidebarList = sidebar.querySelector('.view-sidebar-list');
    const viewSidebarItems = sidebar.querySelectorAll('.view-sidebar-item');

    sidebar.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.closest('.user-login-btn')) popupLogin.classList.remove('hide');
        if (e.target.closest('.view-sidebar-btn')) viewSidebarList.classList.add('show');
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
        if (e.target.closest('.user-logout')) logOut();
    })
};

export default sidebar;