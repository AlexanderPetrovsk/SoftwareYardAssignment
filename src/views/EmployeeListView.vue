<template>List</template>
<script setup lang="ts">
import { useEmployeeStore } from '@/stores/employeeStore';
import { onMounted } from 'vue';

const employeeStore = useEmployeeStore();

onMounted(() => {
    employeeStore.getEmployees();
})
</script>
