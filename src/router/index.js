import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/DashboardPage.vue'),
      meta: { layout: 'default' },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue'),
      meta: { layout: 'login' },
    },
    {
      path: '/scheduled',
      name: 'Scheduled inspections',
      component: () => import('@/views/ScheduledInspectionsPage.vue'),
      meta: { layout: 'default' },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;