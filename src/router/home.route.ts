export default function homeRoutes() {
  return [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../pages/home/index.vue'),
      meta: {
        title: 'Home',
      },
    },
  ]
}
