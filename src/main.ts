import { createApp } from 'vue'
import { createPinia } from 'pinia'

// deps
import App from './App.vue'
import router from './routes'

import { installComponents } from './utils/components.util'
import 'element-plus/lib/theme-chalk/index.css'

// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

installComponents(app)

app.use(createPinia()).use(router).mount('#app')
