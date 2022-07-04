<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  document.querySelector("body>.loading").classList.add("mounted");
});
</script>
