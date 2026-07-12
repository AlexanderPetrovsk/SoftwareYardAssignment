<template>
  <v-snackbar
    v-model="visible"
    color="error"
    timeout="3000"
    location="top end"
  >
    {{ employeeStore.error }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

const visible = computed({
  get: () => !!employeeStore.error,
  set: (value) => {
    if (!value) {
      employeeStore.clearErrors()
    }
  },
})
</script>
