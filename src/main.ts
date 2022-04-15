import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import useElementPlus from './plugins/element-plus';
import { createPinia } from 'pinia';

const app = createApp(App);

useElementPlus(app);
app.use(createPinia());
app.use(router);
app.mount('#app');
