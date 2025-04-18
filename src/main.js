import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 权限指令
app.directive('permission', {
  mounted(el, binding) {
    const authStore = useAuthStore()
    const { value } = binding

    if (value && !authStore.hasPermission(value)) {
      el.parentNode?.removeChild(el)
    }
  }
})

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')