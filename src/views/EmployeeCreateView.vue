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

const router = useRouter();

const employeeStore = useEmployeeStore();

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

  router.push({ name: 'list' });
};
</script>
