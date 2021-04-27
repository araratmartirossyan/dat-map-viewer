import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'
import { installComponents } from './utils/components.util'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

installComponents(app)

app.use(createPinia()).use(router).mount('#app')
