<template>
  <EmployeeForm
    :employee="employee"
    action="create"
    @save="save"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Employee } from '@/types/employee';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeForm from '@/components/forms/EmployeeForm.vue';
import { useNotificationStore } from '@/stores/notificationStore';

const emit = defineEmits<{
  (e: 'show-notification', message: string): void;
}>();

const router = useRouter();

const employeeStore = useEmployeeStore();
const notificationStore = useNotificationStore();

const employee = ref<Employee>({
  code: '',
  fullName: '',
  occupation: '',
  department: '',
  dateOfEmployment: '',
  terminationDate: '',
});

const save = (employee: Employee) => {
  employeeStore.createEmployee(employee);
  notificationStore.showNotification('Created Employee!');

  router.push({ name: 'list' });
};
</script>
