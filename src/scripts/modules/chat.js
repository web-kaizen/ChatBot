const chat = () => {
    const mainContent = document.querySelector('.main-content');
    const mainChat = document.querySelector('.main-chat');
    const chatTitle = mainChat.querySelector('.chat-title');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const chatCloseBtn = mainChat.querySelector('.chat-close');

    const openNewChat = ({ bot, model, mode }) => {
        mainChat.classList.remove('hide');
        mainContent.classList.add('hide');

        if (bot === 'ChatGpt') {
            chatTitle.textContent = `${model} (${mode})`
        } else {
            chatTitle.textContent = bot
        };
    };

    const closeChat = () => {
        mainContent.classList.remove('hide');
        mainChat.classList.add('hide');
    };

    newChatBtn.addEventListener('click', () => {
        openNewChat(JSON.parse(localStorage.getItem('bots')));
    });

    chatCloseBtn.addEventListener('click', () => {
        closeChat();
    });
};

export default chat;