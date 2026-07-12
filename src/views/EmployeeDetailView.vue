<template>
  <v-container max-width="1440px">
    <template v-if="employee">
      <v-card
        rounded="lg"
        class="mb-6 border"
      >
        <v-card-text
          class="d-flex align-center"
          :class="{ 'flex-wrap': xs }"
        >
          <v-avatar
            color="primary"
            :size="xs ? 64 : 72"
            class="mr-5"
          >
            {{ initials }}
          </v-avatar>

          <div>
            <div class="text-title-large font-weight-bold">
              {{ employee.fullName }}
            </div>

            <div class="text-subtitle-1">
              {{ employee.occupation }}
            </div>

            <div class="mt-3 d-flex">
              <v-chip
                v-if="employee && showEmploymentStatus(employee.terminationDate)"
                :color="getEmploymentStatus(employee.dateOfEmployment).color"
                variant="tonal"
              >
                {{ getEmploymentStatus(employee.dateOfEmployment).text }}
              </v-chip>

              <v-chip
                v-if="employee.terminationDate"
                :color="getTerminationStatus(employee.terminationDate).color"
                variant="tonal"
              >
                {{ getTerminationStatus(employee.terminationDate).text }}
              </v-chip>
            </div>
          </div>

          <v-spacer />

          <v-btn
            :class="{ 'mt-6 w-100': xs }"
            color="primary"
            @click="handleEditEmployee(employee.code)"
          >
            Edit Employee
          </v-btn>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col cols="12">
          <v-card
            rounded="lg"
            class="border"
          >
            <v-card-title> Employment Information </v-card-title>

            <v-divider />

            <v-list density="comfortable">
              <v-list-item
                v-for="item in getEmployeeDetailItems(employee)"
                :title="item.title"
                :subtitle="item.subtitle"
              />
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <div class="mt-6 float-right">
        <v-btn
          variant="outlined"
          @click="router.push('/')"
        >
          Back to Employees
        </v-btn>
      </div>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useEmployeeStore } from '@/stores/employeeStore';
import { useEmployeeStatus } from '@/composables/useEmployeeStatus';
import { getEmployeeDetailItems } from '@/data/employee_detail_list_items';

const route = useRoute();
const { xs } = useDisplay();
const router = useRouter();

const employeeStore = useEmployeeStore();

const { getEmploymentStatus, getTerminationStatus, showEmploymentStatus } = useEmployeeStatus();

onMounted(async () => {
  if (!employeeStore.employees.length) {
    await employeeStore.getEmployees();
  }
});

const employee = computed(() => employeeStore.getEmployeeByCode(route.params.code as string));

watch(employee, (value) => !value && router.push({ name: 'not-found' }), { immediate: true });

const initials = computed(() => {
  if (!employee.value) return '';

  return employee.value.fullName
    .split(' ')
    .map((employeeName) => employeeName[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
});

const handleEditEmployee = (code: string) => {
  router.push({ name: 'edit', params: { code: code } });
};
</script>
