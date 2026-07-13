<template>
  <v-container
    max-width="1280px"
    class="mt-12"
  >
    <v-card>
      <v-card-title> Employee Information </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="code.value.value"
              label="Code *"
              :error-messages="code.errorMessage.value"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="fullName.value.value"
              label="Full Name *"
              :error-messages="fullName.errorMessage.value"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="occupation.value.value"
              label="Occupation *"
              :error-messages="occupation.errorMessage.value"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="department.value.value"
              label="Department *"
              :error-messages="department.errorMessage.value"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="dateOfEmployment.value.value"
              type="date"
              label="Employment Date"
              :error-messages="dateOfEmployment.errorMessage.value"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="terminationDate.value.value"
              type="date"
              label="Termination Date"
              :error-messages="terminationDate.errorMessage.value"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />

      <v-card-actions class="justify-end pa-4">
        <v-btn
          variant="outlined"
          @click="router.back()"
        >
          Cancel
        </v-btn>

        <v-btn
          variant="outlined"
          color="primary"
          @click="submit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';

import type { Employee } from '@/types/employee';
import { useValidation } from '@/composables/useValidation';

const props = defineProps<{
  employee: Employee;
  action: 'edit' | 'create';
}>();

const emit = defineEmits<{
  (e: 'save', employee: Employee): void;
}>();

const router = useRouter();

const { employeeSchema } = useValidation(props.action);

const { handleSubmit, resetForm } = useForm({
  validationSchema: employeeSchema,
});

const code = useField<string>('code');
const fullName = useField<string>('fullName');
const occupation = useField<string>('occupation');
const department = useField<string>('department');
const dateOfEmployment = useField<string>('dateOfEmployment');
const terminationDate = useField<string | null>('terminationDate') || null;

watch(
  () => props.employee,
  (employee) => {
    resetForm({
      values: employee,
    });
  },
  {
    immediate: true,
  },
);

const submit = handleSubmit((values) => {
  emit('save', values as Employee);
});
</script>
