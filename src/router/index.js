import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/completed',
      name: 'Completed inspections',
      component: () => import('@/views/CompletedInspectionsPage.vue'),
      meta: { layout: 'default' },
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/HelpPage.vue'),
      meta: { layout: 'default' },
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/DashboardPage.vue'),
      meta: { layout: 'default' },
    },
    {
      path: '/knowledge-base',
      name: 'Knowledge base',
      component: () => import('@/views/KnowledgeBasePage.vue'),
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
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/SettingsPage.vue'),
      meta: { layout: 'default' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage.vue'),
      meta: { layout: 'login' },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;