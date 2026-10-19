<script setup lang="ts">
const emit = defineEmits<{ press: [] }>();
</script>

<template>
  <button type="button" @click="emit('press')">Press</button>
</template>
