<template>
  <div class="d-flex ga-2">
    <v-btn
      prepend-icon="mdi-eye"
      size="small"
      variant="text"
      color="primary"
      @click="emit('view')"
      >{{ !xs ? 'View' : '' }}</v-btn
    >
    <v-btn
      prepend-icon="mdi-pencil"
      size="small"
      variant="text"
      color="warning"
      @click="emit('edit')"
      >{{ !xs ? 'Edit' : '' }}</v-btn
    >

    <v-btn
      prepend-icon="mdi-delete"
      size="small"
      variant="text"
      color="error"
      @click="emit('delete')"
      >{{ !xs ? 'Delete' : '' }}</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const emit = defineEmits(['view', 'edit', 'delete']);

const { xs } = useDisplay();
</script>
