<template>
  <v-dialog
    v-model="isOpen"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-wrap">Import Employees</v-card-title>

      <v-card-actions class="flex-wrap mt-6">
        <v-file-input
          min-width="250px"
          v-model="uploadedFile"
          label="Choose a JSON file"
          variant="outlined"
          prepend-icon="mdi-file-document-outline"
          accept=".json"
          show-size
        ></v-file-input>
        <v-switch
          label="Overwrite"
          class="mx-auto"
          true-icon="mdi-check"
          false-icon="mdi-close"
          v-model="replace"
        />
      </v-card-actions>

      <v-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Import"
          @click="handleImport"
          variant="outlined"
        />
        <v-btn
          text="Cancel"
          @click="isOpen = false"
          variant="outlined"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEmployeeImportExport } from '@/composables/useEmployeeImportExport';

const { importEmployees } = useEmployeeImportExport();

const isOpen = defineModel({ type: Boolean, default: false });

const uploadedFile = ref<File | null>(null);
const replace = ref(false);

const handleImport = () => {
  importEmployees(uploadedFile.value as File, replace.value);
  isOpen.value = false;
};
</script>
