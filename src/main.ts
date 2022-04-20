import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import useElementPlus from './plugins/element-plus'
import { createPinia } from 'pinia'
import { init } from './plugins/cdn'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
useElementPlus(app)
app.use(router)
app.mount('#app')

export const cdnSdk = init()
