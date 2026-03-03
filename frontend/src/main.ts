import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { frappeRequest, setConfig, resourcesPlugin } from 'frappe-ui'
import './style.css'

setConfig('resourceFetcher', frappeRequest)

const app = createApp(App)
app.use(router)
app.use(resourcesPlugin)
app.mount('#app')
