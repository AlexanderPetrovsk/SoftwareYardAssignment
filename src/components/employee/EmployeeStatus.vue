<template>
  <v-chip
    :color="status.color"
    size="small"
  >
    {{ status.text }}
  </v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEmployeeStatus } from '@/composables/useEmployeeStatus';
const { getEmploymentStatus, getTerminationStatus, showEmploymentStatus } = useEmployeeStatus();

const props = defineProps<{
  type: 'employment' | 'termination';
  employmentDate?: string | null;
  terminationDate?: string | null;
}>();

const status = computed(() => {
  const employmentStatus = props.employmentDate ? getEmploymentStatus(props.employmentDate) : null;
  const terminationStatus = props.terminationDate ? getTerminationStatus(props.terminationDate) : null;

  if (props.type == 'termination' && terminationStatus) {
    return terminationStatus;
  }

  if (props.type == 'employment' && employmentStatus && showEmploymentStatus(props.terminationDate)) {
    return employmentStatus;
  }

  return {
    text: '-',
    color: 'grey',
  };
});
</script>
