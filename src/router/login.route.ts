export default function loginRoutes() {
  return [
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */ '../pages/login/index.vue'),
      meta: {
        title: 'login',
      },
    },
  ]
}
