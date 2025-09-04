<script setup lang="ts">
const props = defineProps<{
  message: string;
  styleName?: string;
  eventFunction: () => void; 
}>();
</script>

<template>
  <button :class="styleName" @click="eventFunction">
    {{ message }}
  </button>
</template>
