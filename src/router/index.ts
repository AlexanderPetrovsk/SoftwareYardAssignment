import NotFoundView from '@/views/NotFoundView.vue';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeListView from '@/views/EmployeeListView.vue';
import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router';

const routeGuard = async (to: RouteLocationNormalizedGeneric) => {
  const store = useEmployeeStore();

  if (!store.employees.length) {
    await store.getEmployees();
  }

  const employee = store.getEmployeeByCode(to.params.code as string);

  if (!employee) {
    return {
      name: 'not-found',
    };
  }
};

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
      beforeEnter: async (to) => routeGuard(to),
    },
    {
      path: '/detail/:code',
      name: 'detail',
      component: () => import('@/views/EmployeeDetailView.vue'),
      beforeEnter: async (to) => routeGuard(to),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
