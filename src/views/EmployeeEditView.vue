<template>
  <EmployeeForm
    v-if="employee"
    :employee="employee"
    action="edit"
    @save="save"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Employee } from '@/types/employee';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeForm from '@/components/forms/EmployeeForm.vue';

const route = useRoute();
const router = useRouter();

const employeeStore = useEmployeeStore();

const employee = computed(() => employeeStore.getEmployeeByCode(route.params.code as string));

function save(employee: Employee) {
  employeeStore.updateEmployee(employee);

  router.push({ name: 'list' });
}
</script>
