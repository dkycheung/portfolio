<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router';
import { RouterView } from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue';
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
  // background: #444444;
}

body {
  // background: #000000;
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

  @include media-breakpoint-down(md) {
    background-size: auto 100%;
    background-position-x: center;
    background-position-y: top;
    min-height: 100dvh;
  }
}
</style>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
