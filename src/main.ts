import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import useElementPlus from './plugins/element-plus';
import { createPinia } from 'pinia';
import useConfigStore from './store/config';
import { storage, Config_Key } from './utils/storage';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
initConfig();
useElementPlus(app);

app.use(router);

app.mount('#app');

function initConfig() {
  const config = useConfigStore();
  const configure = storage.get(Config_Key);
  if (configure) {
    config.setConfig(configure);
  }
}
