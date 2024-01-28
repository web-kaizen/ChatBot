import { createApp } from 'vue'
import { createPinia } from 'pinia'
import hljsVuePlugin from "@highlightjs/vue-plugin";
import App from './App.vue'

import './assets/styles/style.css'
import 'highlight.js/styles/default.css';
import 'highlight.js/styles/atom-one-dark.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(hljsVuePlugin)
app.mount('#app')