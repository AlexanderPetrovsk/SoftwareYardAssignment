<template>
  <v-snackbar
    v-model="showNotification"
    color="success"
    timeout="3000"
    location="top end"
    @update:modelValue="notificationStore.clearNotification()"
  >
    {{ notificationStore.activeNotification }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';

const notificationStore = useNotificationStore();

const showNotification = computed(() => {
  return notificationStore.activeNotification !== null;
});
</script>
