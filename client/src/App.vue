<script setup lang="ts">
import AddButton from "./components/buttons/AddButton.vue";
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p class="font-bold text-[20px] text-center">
      Vue.js Express.js MongoDB Docker Todo App
    </p>
    <input placeholder="文字を入力" type="text" />
    <AddButton message="追加" styleName="text-green-500" />
    <AddButton message="削除" styleName="text-red-500" />
  </div>
</template>
