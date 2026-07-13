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
      @delete="openDeleteModal"
      @create="handleCreate"
    />
    <v-btn
      class="float-right mt-12"
      color="primary"
      text="Create"
      @click="handleCreate"
    />
    <DeleteEmployeeModal
      v-model="isDialogOpen"
      :code="deletedEmployeeCode"
      @confirm="deleteEmployeeConfirmation"
    />
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Employee } from '@/types/employee';
import { useEmployeeStore } from '@/stores/employeeStore';
import EmployeeTable from '@/components/employee/EmployeeTable.vue';
import EmployeeFilters from '@/components/employee/EmployeeFilters.vue';
import DeleteEmployeeModal from '@/components/modals/DeleteEmployeeModal.vue';

const router = useRouter();
const employeeStore = useEmployeeStore();

const search = ref('');
const department = ref(null);
const occupation = ref(null);
const isDialogOpen = ref(false);
const deletedEmployeeCode = ref<string>('');

const handleView = (item: Employee) => {
  router.push({ name: 'detail', params: { code: item.code } });
};

const handleEdit = (item: Employee) => {
  router.push({ name: 'edit', params: { code: item.code } });
};

const openDeleteModal = (item: Employee) => {
  isDialogOpen.value = true;
  deletedEmployeeCode.value = item.code;
};

const deleteEmployeeConfirmation = () => {
  employeeStore.deleteEmployee(deletedEmployeeCode.value);
};
const handleCreate = () => {
  router.push({ name: 'create' });
};
</script>
