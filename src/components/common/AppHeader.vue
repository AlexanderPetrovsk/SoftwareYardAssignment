<template>
  <v-app-bar
    elevation="2"
    density="comfortable"
  >
    <v-btn
      v-if="!mdAndUp"
      icon="mdi-menu"
      @click="drawer = !drawer"
    />

    <v-icon
      size="32"
      color="primary"
      icon="mdi-office-building"
      class="ml-3"
    />

    <v-toolbar-title
      class="font-weight-bold text-primary flex-1-1-100 flex-sm-1-1-0 ml-0"
      text="Purple Cross HR"
    />

    <v-spacer />

    <template v-if="mdAndUp">
      <v-switch
        class="mr-12"
        prepend-icon="mdi-weather-night"
        append-icon="mdi-weather-sunny"
        hide-details
        @change="theme.cycle()"
      />

      <v-btn
        prepend-icon="mdi-account-group"
        @click="goToEmployees"
      >
        Employees
      </v-btn>

      <v-divider
        vertical
        class="mx-3"
      />

      <v-btn
        prepend-icon="mdi-upload"
        variant="text"
        @click="openImport"
      >
        Import
      </v-btn>

      <v-btn
        prepend-icon="mdi-download"
        variant="text"
        @click="exportEmployees"
      >
        Export
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
  >
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-weather-night"
        append-icon="mdi-weather-sunny"
        max-width="60px"
      >
        <v-switch
          hide-details
          @change="theme.cycle()"
        />
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group"
        title="Employees"
        @click="goToEmployees"
      />

      <v-list-item
        prepend-icon="mdi-upload"
        title="Import"
        @click="openImport"
      />

      <v-list-item
        prepend-icon="mdi-download"
        title="Export"
        @click="exportEmployees"
      />
    </v-list>
  </v-navigation-drawer>

  <ImportEmployeesModal v-model="isDialogOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme, useDisplay } from 'vuetify';

import ImportEmployeesModal from '../modals/ImportEmployeesModal.vue';
import { useEmployeeImportExport } from '@/composables/useEmployeeImportExport';

const router = useRouter();
const theme = useTheme();
const { mdAndUp } = useDisplay();

const { exportEmployees } = useEmployeeImportExport();

const drawer = ref(false);
const isDialogOpen = ref(false);

const goToEmployees = () => {
  drawer.value = false;
  router.push({ name: 'list' });
};

const openImport = () => {
  drawer.value = false;
  isDialogOpen.value = true;
};
</script>
