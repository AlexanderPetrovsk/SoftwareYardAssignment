<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-card
      max-width="1200"
      width="100%"
      rounded="lg"
      elevation="3"
    >
      <v-card-text class="text-center pa-10">
        <v-avatar
          color="error"
          size="88"
          class="mb-6"
        >
          <v-icon
            size="52"
            icon="mdi-alert-circle-outline"
          />
        </v-avatar>

        <div class="font-weight-bold mb-2">404</div>

        <div class="mb-4">Page Not Found</div>

        <div class="mb-8">
          The page you are looking for doesn't exist, or the employee you are trying to access could not be
          found.
        </div>

        <v-row class="ga-3 justify-center">
          <v-btn
            color="primary"
            prepend-icon="mdi-account-group"
            @click="router.push({ name: 'list' })"
          >
            Back to Employees
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();

const router = useRouter();
</script>
