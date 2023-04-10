import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from "@/router/index"

import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"

createApp(App)
.use(PrimeVue)
.use(router)
.mount('#app')
