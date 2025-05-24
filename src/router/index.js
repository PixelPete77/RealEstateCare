import { createRouter, createWebHistory } from '@ionic/vue-router';

// TODO: Check if it would be better to use different layouts, or not render the Header and Footer components when the user is not logged in

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/completed',
    name: 'Completed inspections',
    component: () => import('@/views/CompletedInspectionsPage.vue'),
    meta: { layout: 'default', requiresAuth: true, title: 'Completed inspections' },
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/HelpPage.vue'),
    meta: { layout: 'default', requiresAuth: true, title: 'Help' },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/DashboardPage.vue'),
    meta: { layout: 'default', requiresAuth: true, title: 'Dashboard' },
  },
  {
    path: '/inspection/:id',
    name: 'inspection',
    component: () => import('@/views/InspectionPage.vue'),
    meta: { layout: 'default', requiresAuth: true, title: 'Inspection' },
  },
  {
    path: '/knowledge-base',
    name: 'Knowledge base',
    component: () => import('@/views/KnowledgeBasePage.vue'),
    meta: { layout: 'default', requiresAuth: true, title: 'Knowledge base' },
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
    meta: { layout: 'default', requiresAuth: true, title: 'Scheduled inspections' },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsPage.vue'),
    meta: { layout: 'default', requiresAuth: true, title: 'Help' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { layout: 'login', title: 'Page not found' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, next) => {
  // Check if session data exists in localStorage. If so, the user is authenticated
  const session = JSON.parse(localStorage.getItem('session'));
  const isAuthenticated = session && Date.now() < session.expiresAt;
  // Check if the route requires authentication and if the user is authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login' }; // Redirect to the login page if not authenticated
  } else {
    return true; // Allow navigation to the route
  }
});

router.afterEach((to) => {
  document.title = `${to.meta.title} | RealEstateCare` || 'RealEstateCare';
});

export default router;