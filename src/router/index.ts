import { createDynamicRoutes, getCaseList, getJobExp } from '@/utils/dynamicLoading';
import HomeView from '@/views/HomeView.vue';
import { type AsyncComponentLoader } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// define all used components
export const VIEW_COMPONENTS = {
  CaseView: (() => import('@/views/CaseView.vue')) as AsyncComponentLoader,
} as const;

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
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/job-exp',
      name: 'Job Experence',
      component: () => import('@/views/CaseListView.vue'),
      props: { title: 'Job Experences', caseList: getCaseList() },
    },
  ],
});

(await createDynamicRoutes(await getJobExp(), '/job-exp', 'CaseView')).forEach((route) => router.addRoute(route));

export default router;
