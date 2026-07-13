import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notifications', () => {
  const activeNotification = ref<string | null>(null);

  const showNotification = (message: string) => {
    activeNotification.value = message;

    setTimeout(() => {
      clearNotification();
    }, 3000);
  };

  const clearNotification = () => {
    activeNotification.value = null;
  };

  return {
    activeNotification,
    showNotification,
    clearNotification,
  };
});
