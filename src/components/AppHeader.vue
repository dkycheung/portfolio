<script setup lang="ts">
// Your script here
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: $dark;
}

.logo {
  display: block;
  margin: 0 auto;
  width: auto;
  height: 100%;
}
</style>
