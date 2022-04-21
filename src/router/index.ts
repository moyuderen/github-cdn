import { createRouter, createWebHashHistory } from 'vue-router'
import { storage, Config_Key } from '@/utils/storage'

import homeRoutes from './home.route'
import loginRoutes from './login.route'

const routes = [...loginRoutes(), ...homeRoutes()]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const hasToken = () => {
  const config = storage.get(Config_Key)
  return !!config.token
}

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | octokit`
  }
  console.log(storage.get(Config_Key))
  if (to.name !== 'Login' && !hasToken()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // console.log(to, from)
  // console.log('afterEach');
})

export default router
