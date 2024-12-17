import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Material from '@primevue/themes/material';

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            darkModeSelector: '.dark-mode',
        }
    }
});
app.use(router)

app.mount('#app')
