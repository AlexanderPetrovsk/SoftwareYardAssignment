<template>
  <div class="d-flex ga-2">
    <v-btn
      icon="mdi-eye"
      size="small"
      variant="text"
      color="primary"
      @click="emit('view')"
      >View</v-btn
    >

    <v-btn
      icon="mdi-pencil"
      size="small"
      variant="text"
      color="warning"
      @click="emit('edit')"
      >Edit</v-btn
    >

    <v-btn
      icon="mdi-delete"
      size="small"
      variant="text"
      color="error"
      @click="emit('delete')"
      >Delete</v-btn
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['view', 'edit', 'delete']);
</script>
