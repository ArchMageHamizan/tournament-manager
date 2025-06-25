import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Import the router instance from the router module."index.js" is the default file for the router module in Vue.js projects.

createApp(App).use(router).mount('#app')
