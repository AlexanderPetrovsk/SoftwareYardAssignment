<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
      class="border-lg rounded-t-lg"
    >
      <v-text-field
        :model-value="search"
        :density="xs ? 'compact' : null"
        label="Search employees"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        variant="solo"
        @update:model-value="emit('update:search', $event)"
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="border-lg rounded-t-lg"
    >
      <v-select
        :model-value="department"
        :items="departmentOptions"
        :density="xs ? 'compact' : null"
        clearable
        single-line
        hide-details
        variant="solo"
        label="Department"
        @update:model-value="emit('update:department', $event)"
      />
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="border-lg rounded-t-lg"
    >
      <v-select
        :model-value="occupation"
        :items="occupationOptions"
        :density="xs ? 'compact' : null"
        clearable
        single-line
        hide-details
        variant="solo"
        label="Occupation"
        @update:model-value="emit('update:occupation', $event)"
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Employee } from '@/types/employee';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const emit = defineEmits(['update:search', 'update:department', 'update:occupation']);

const props = defineProps<{
  employees: Employee[];
}>();

const { xs } = useDisplay();

const search = defineModel('search', { type: String, default: '' });
const department = defineModel('department', { type: String, default: null });
const occupation = defineModel('occupation', { type: String, default: null });

const occupationOptions = computed(() => {
  return [...new Set(props.employees.map((employee) => employee.occupation))];
});

const departmentOptions = computed(() => {
  return [...new Set(props.employees.map((employee) => employee.department))];
});
</script>
