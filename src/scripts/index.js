import '../styles/style.css';

import main from './modules/main';
import selects from './modules/selects'
import chat from './modules/chat'

import url from '../db/bots.json?url'

main();
selects(url);
chat();