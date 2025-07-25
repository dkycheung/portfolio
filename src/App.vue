<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { setCSSRootVariables } from './utils/utils';
import AppHeader from './components/AppHeader.vue';
onMounted(() => {
  setCSSRootVariables(
    { key: 'main-bg-color', value: '#b1fcf9' },
    {
      key: 'resource-base',
      value: '/resources/',
    },
  );
  document.getElementById('app')?.classList.add('container-xl');
});
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style global lang="scss">
html {
  background: #444444;
}

body {
  background: #444444;
  box-sizing: border-box;
}

#app {
  // background: #b1fcf9 url('#{$resource-base}img/background-pc.jpg') no-repeat top center !important;
  background: #000000 url('#{$resource-base}img/background-pc.jpg') no-repeat top center;
  background-size: 100% 100%;
  // min-height: 600px;
  min-height: $app-height;
  position: relative;
  border: #444444;
  border-style: groove;
  border-radius: 10px;

  @include media-mobile {
    background-size: auto 100%;
    background-position-x: center;
    background-position-y: top;
    min-height: 100dvh;
  }
}
</style>
