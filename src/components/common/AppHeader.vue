<template>
  <v-app-bar
    elevation="2"
    density="comfortable"
  >
    <v-icon
      size="32"
      color="primary"
      icon="mdi-office-building"
      class="ml-3"
    />
    <v-toolbar-title class="font-weight-bold text-light"> Purple Cross HR </v-toolbar-title>

    <v-spacer />

    <v-switch
      prepend-icon="mdi-weather-night"
      append-icon="mdi-weather-sunny"
      @change="theme.cycle()"
      hide-details
      size="small"
      class="mr-12"
    ></v-switch>

    <v-btn
      prepend-icon="mdi-account-group"
      @click="router.push({ name: 'list' })"
    >
      Employees
    </v-btn>

    <v-divider
      vertical
      class="mx-3"
    />
    <div>
      <v-btn
        variant="text"
        prepend-icon="mdi-upload"
        @click="isDialogOpen = true"
      >
        Import
      </v-btn>
    </div>
    <v-btn
      variant="text"
      prepend-icon="mdi-download"
      @click="exportEmployees"
    >
      Export
    </v-btn>
    <ImportEmployeesModal v-model="isDialogOpen" />
  </v-app-bar>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';

import ImportEmployeesModal from '../modals/ImportEmployeesModal.vue';
import { useEmployeeImportExport } from '@/composables/useEmployeeImportExport.ts';

const router = useRouter();
const theme = useTheme();

const { exportEmployees } = useEmployeeImportExport();

const isDialogOpen = ref(false);
</script>
