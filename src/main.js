import { createApp } from 'vue'
import App from './App.vue'
import User from './libs/User'

import './assets/styles/style.css'

window.user = new User()

createApp(App).mount('#app')
