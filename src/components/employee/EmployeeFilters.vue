<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
      class="border-lg rounded-t-lg"
    >
      <v-text-field
        :model-value="search"
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
        label="Department"
        :items="departmentOptions"
        clearable
        hide-details
        variant="solo"
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
        label="Occupation"
        :items="occupationOptions"
        clearable
        hide-details
        variant="solo"
        @update:model-value="emit('update:occupation', $event)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Employee } from '@/types/employee';
import { computed } from 'vue';

const props = defineProps<{
  employees: Employee[];
}>();

const occupationOptions = computed(() => {
  return [...new Set(props.employees.map((employee) => employee.occupation))];
});

const departmentOptions = computed(() => {
  return [...new Set(props.employees.map((employee) => employee.department))];
});

const search = defineModel('search', { type: String, default: '' });
const department = defineModel('department', { type: String, default: null });
const occupation = defineModel('occupation', { type: String, default: null });

const emit = defineEmits(['update:search', 'update:department', 'update:occupation']);
</script>
