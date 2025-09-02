<template>
  <button :class='styleName'>
    {{ props.message }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string; styleName:string }>()
</script>
