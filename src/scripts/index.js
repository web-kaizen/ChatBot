import '../styles/style.css';

import sidebar from './modules/sidebar';
import popupLogin from './modules/popupLogin';
import selects from './modules/selects';
import chat from './modules/chat';

import User from './modules/libs/User';

import url from '../db/bots.json?url'

window.user = new User()

sidebar();
popupLogin();
selects(url);
chat();