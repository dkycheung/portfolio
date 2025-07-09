// import './assets/main.css';
// import './assets/bootstrap-custom-scheme.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
