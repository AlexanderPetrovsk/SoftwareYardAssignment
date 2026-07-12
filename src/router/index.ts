import EmployeeListView from '@/views/EmployeeListView.vue';
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
  ],
});

export default router;
