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
import { useNotificationStore } from '@/stores/notificationStore';
import { computed } from 'vue';

const notificationStore = useNotificationStore();

const showNotification = computed(() => {
  return notificationStore.activeNotification !== null;
});
</script>
