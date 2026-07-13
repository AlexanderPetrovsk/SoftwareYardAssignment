<template>
  <v-card elevation="2">
    <v-data-table
      :items="filteredEmployees"
      :headers="employeeTableHeaders"
      fixed-header
      height="600px"
      striped="even"
    >
      <template #item.dateOfEmployment="{ item }">
        <EmployeeStatus
          type="employment"
          :employmentDate="item.dateOfEmployment"
          :terminationDate="item.terminationDate"
        />
      </template>
      <template #item.terminationDate="{ item }">
        <EmployeeStatus
          type="termination"
          :terminationDate="item.terminationDate"
        />
      </template>
      <template #item.actions="{ item }">
        <EmployeeActions
          @view="emit('view', item)"
          @edit="emit('edit', item)"
          @delete="emit('delete', item)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Employee } from '@/types/employee';
import EmployeeStatus from './EmployeeStatus.vue';
import EmployeeActions from './EmployeeActions.vue';
import { employeeTableHeaders } from '@/data/employee_table_headers';

const emit = defineEmits<{
  (e: 'view', employee: Employee): void;
  (e: 'edit', employee: Employee): void;
  (e: 'delete', employee: Employee): void;
}>();

const props = defineProps<{
  employees: Employee[];
  search: string;
  department: string | null;
  occupation: string | null;
}>();

const filteredEmployees = computed(() => {
  return props.employees.filter((employee) => {
    const matchesSearch = employee.fullName.toLowerCase().includes(props.search.toLowerCase());

    const matchesDepartment = !props.department || employee.department === props.department;

    const matchesOccupation = !props.occupation || employee.occupation === props.occupation;

    return matchesSearch && matchesDepartment && matchesOccupation;
  });
});
</script>
