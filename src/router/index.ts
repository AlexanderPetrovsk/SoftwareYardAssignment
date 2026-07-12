import EmployeeListView from '@/views/EmployeeListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: EmployeeListView,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/EmployeeCreateView.vue'),
    },
    {
      path: '/edit/:code',
      name: 'edit',
      component: () => import('@/views/EmployeeEditView.vue'),
    },
    {
      path: '/detail/:code',
      name: 'detail',
      component: () => import('@/views/EmployeeDetailView.vue'),
    },
    {
      path: '/404/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
