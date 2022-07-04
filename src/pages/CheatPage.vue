<script setup>
import { onMounted } from "vue";

onMounted(() => {
  setTimeout(
    () => (location.href = "https://www.bilibili.com/video/BV1GJ411x7h7"),
    1000
  );
});
</script>

<template>
  <div>
    <h1>你被骗了</h1>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: black;

  h1 {
    color: white;
    margin: 0;
    font-weight: bold;
  }
}
</style>
