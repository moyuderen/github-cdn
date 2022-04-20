export default function homeRoutes() {
  return [
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "home" */ '../pages/home/index.vue'),
      meta: {
        title: 'Home',
      },
    },
  ]
}
