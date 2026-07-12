<template>
  <v-app>
    <AppHeader />

    <GlobalError />

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalError from './components/common/GlobalError.vue'
import AppHeader from './components/common/AppHeader.vue'
</script>
