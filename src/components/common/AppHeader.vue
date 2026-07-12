<template>
  <v-app-bar
    elevation="2"
    color="surface"
    density="comfortable"
  >
    <v-toolbar-title class="font-weight-bold text-primary"> Purple Cross HR </v-toolbar-title>

    <v-spacer />

    <v-btn
      variant="text"
      prepend-icon="mdi-account-group"
      @click="router.push({ name: 'list' })"
    >
      Employees
    </v-btn>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
