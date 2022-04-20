import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import useElementPlus from './plugins/element-plus'
import { createPinia } from 'pinia'
import { setupCdn } from './plugins/cdn'
import { Cdn } from '@/core/index'

// 放到env.d.ts会导致vue导出模块出错
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cdn: Cdn
  }
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
setupCdn(app)
useElementPlus(app)
app.use(router)
app.mount('#app')
