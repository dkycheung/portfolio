import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { createDynamicRoutes } from '@/utils/dynamicLoading';
import { getJobExp } from '@/utils/dynamicLoading';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

getJobExp().then((json) => {
  createDynamicRoutes(json, '/job-exp', 'CaseView').then((routes) => {
    routes.forEach((route) => router.addRoute(route));
  });
});
// .catch((err) => {});

export default router;
