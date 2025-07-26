// import './assets/main.css';
// import './assets/bootstrap-custom-scheme.scss';
import 'bootstrap/dist/css/bootstrap.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
