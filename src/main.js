import { createApp } from 'vue'
import App from './App.vue'
import TheMainContent from "./components/MainContent/TheMainContent.vue";

import './assets/styles/style.css'

const app = createApp(App);

app.component('main-component', TheMainContent);
app.mount('#app')

