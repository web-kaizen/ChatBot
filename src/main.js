import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import Message from './libs/Message'

import './assets/styles/style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')


Message.getList(65)