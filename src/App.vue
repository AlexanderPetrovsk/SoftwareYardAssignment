<template>
  <v-app>
    <AppHeader />

    <ErrorNotification />
    <SuccessNotification />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from './components/common/AppHeader.vue';
import { useEmployeeStore } from '@/stores/employeeStore';
import ErrorNotification from './components/common/ErrorNotification.vue';
import SuccessNotification from './components/common/SuccessNotification.vue';

const employeeStore = useEmployeeStore();

onMounted(async () => {
  if (!employeeStore.employees.length) {
    await employeeStore.getEmployees();
  }
});
</script>
