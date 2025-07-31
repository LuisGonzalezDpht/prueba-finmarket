import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import meta from '@/assets/meta'

// el uso de vueuse/head es para el titulo de pagina y meta
import { createHead } from '@vueuse/head'

// importe de css global
import '@/assets/global.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const head = createHead(meta)

// uso de cabecera
app.use(head)

// uso de pinia
app.use(createPinia())

// uso de router
app.use(router)

app.mount('#app')
