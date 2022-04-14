import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue'),
    meta: {
      title: 'Home',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.meta.title) {
    document.title = `${to.meta.title} | octokit`;
  }
  next();
});

router.afterEach((to, from) => {
  // console.log(to, from)
  console.log('afterEach');
});

export default router;
