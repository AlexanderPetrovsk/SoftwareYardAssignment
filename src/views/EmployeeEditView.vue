<template>
  <EmployeeForm
    v-if="employee"
    :employee="employee"
    @save="save"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Employee } from '@/types/employee';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeForm from '@/components/forms/EmployeeForm.vue';
import { useNotificationStore } from '@/stores/notificationStore';

const route = useRoute();
const router = useRouter();

const employeeStore = useEmployeeStore();
const notificationStore = useNotificationStore();

const employee = computed(() => employeeStore.getEmployeeByCode(route.params.code as string));

const save = (employee: Employee) => {
  employeeStore.updateEmployee(employee);
  notificationStore.showNotification('Updated Employee!');

  router.push({ name: 'list' });
};
</script>
