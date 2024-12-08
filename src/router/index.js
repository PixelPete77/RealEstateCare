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
    meta: { layout: 'default', title: 'Completed inspections' },
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/HelpPage.vue'),
    meta: { layout: 'default', title: 'Help' },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { layout: 'default', title: 'Dashboard' },
  },
  {
    path: '/inspection/:id',
    name: 'inspection',
    component: () => import('@/views/InspectionPage.vue'),
    meta: { layout: 'default', title: 'Inspection' },
  },
  {
    path: '/knowledge-base',
    name: 'Knowledge base',
    component: () => import('@/views/KnowledgeBasePage.vue'),
    meta: { layout: 'default', title: 'Knowledge base' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { layout: 'login', title: 'Login' },
  },
  {
    path: '/scheduled',
    name: 'Scheduled inspections',
    component: () => import('@/views/ScheduledInspectionsPage.vue'),
    meta: { layout: 'default', title: 'Scheduled inspections' },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsPage.vue'),
    meta: { layout: 'default', title: 'Help' },
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

router.afterEach((to) => {
  document.title = `${to.meta.title} | RealEstateCare` || 'RealEstateCare';
});

export default router;