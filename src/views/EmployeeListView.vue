<template>
  <v-container
    class="mt-12"
    :fluid="!$vuetify.display.xlAndUp"
  >
    <EmployeeFilters
      :employees="employeeStore.employees"
      v-model:search="search"
      v-model:department="department"
      v-model:occupation="occupation"
    />
    <EmployeeTable
      :employees="employeeStore.employees"
      :search="search"
      :department="department"
      :occupation="occupation"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @create="handleCreate"
    />
  </v-container>
  <v-btn
    class="float-right mt-12 mr-6"
    color="primary"
    text="Create"
    @click="handleCreate"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Employee } from '@/types/employee';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeTable from '@/components/employee/EmployeeTable.vue';
import EmployeeFilters from '@/components/employee/EmployeeFilters.vue';

const router = useRouter();
const employeeStore = useEmployeeStore();

const search = ref('');
const department = ref(null);
const occupation = ref(null);

const handleView = (item: Employee) => {
  router.push({ name: 'detail', params: { code: item.code } });
};

const handleEdit = (item: Employee) => {
  router.push({ name: 'edit', params: { code: item.code } });
};

const handleDelete = (item: Employee) => {
  employeeStore.deleteEmployee(item.code);
};

const handleCreate = () => {
  router.push({ name: 'create' });
};
</script>
