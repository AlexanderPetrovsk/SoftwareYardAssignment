<template>
  <v-dialog
    v-model="isOpen"
    max-width="500px"
  >
    <v-card>
      <v-card-title>Delete Employee</v-card-title>
      <v-card-text>Are you sure you want to delete this employee ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Yes"
          variant="outlined"
          @click="handleDelete"
        ></v-btn>
        <v-btn
          text="Cancel"
          variant="outlined"
          @click="isOpen = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['confirm']);

const isOpen = defineModel({ type: Boolean, default: false });

const props = defineProps<{
  code: string;
}>();

const handleDelete = () => {
  emit('confirm');
  isOpen.value = false;
};
</script>
