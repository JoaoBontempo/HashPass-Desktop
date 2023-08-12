import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Settings from '../views/SettingsView.vue'
import ImportData from '../views/ImportDataView.vue' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/import',
    name: 'import',
    component: ImportData
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
