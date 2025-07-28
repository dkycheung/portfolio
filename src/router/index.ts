import { createDynamicRoutes, getCaseList, getJobExp } from '@/utils/dynamicLoading';
import HomeView from '@/views/HomeView.vue';
import { type AsyncComponentLoader } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// define all used components
export const VIEW_COMPONENTS = {
  About: (() => import('@/views/AboutView.vue')) as AsyncComponentLoader,
  CaseListView: (() => import('@/views/CaseListView.vue')) as AsyncComponentLoader,
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
      component: VIEW_COMPONENTS['About'],
    },
    {
      path: '/job-exp',
      name: 'Work',
      component: VIEW_COMPONENTS['CaseListView'],
      props: { title: 'Work', caseList: getCaseList() },
    },
  ],
});

(await createDynamicRoutes(await getJobExp(), '/job-exp', 'CaseView')).forEach((route) => router.addRoute(route));

export default router;
