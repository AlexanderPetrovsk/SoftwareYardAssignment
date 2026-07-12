<template>
  <v-app>
    <AppHeader />

    <GlobalError />

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
import GlobalError from './components/common/GlobalError.vue';

const employeeStore = useEmployeeStore();

onMounted(async () => {
  if (!employeeStore.employees.length) {
    await employeeStore.getEmployees();
  }
});
</script>
