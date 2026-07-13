<template>
  <v-snackbar
    v-model="showNotification"
    color="error"
    timeout="3000"
    location="top end"
    @update:modelValue="employeeStore.clearErrors()"
  >
    {{ employeeStore.error }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useEmployeeStore } from '@/stores/employeeStore';

const employeeStore = useEmployeeStore();

const showNotification = computed(() => {
  return employeeStore.error !== null;
});
</script>
