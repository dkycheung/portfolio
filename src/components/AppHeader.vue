<script setup lang="ts">
import { computed } from 'vue';

// Your script here
function back(event: Event) {
  window.history.back();
}

const canBack = computed(() => window.history.length > 1);
</script>

<template>
  <header>
    <div class="header row">
      <img alt="Back" class="logo" src="@/assets/back-arrow.svg" :class="{ disabled: !canBack }" @click="back" />
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 30px;
  justify-items: center;
  position: sticky;
  top: 0;
}

.header {
  height: 100%;
  width: fit-content;
  padding: 1px 5px 5px 5px;
  box-sizing: content-box;
  background-color: $dark;
  border-radius: 0 0 18px 18px;
}

.logo {
  display: block;
  margin: 0 auto;
  width: auto;
  height: 100%;
}
</style>
