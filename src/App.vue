<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router';
import { RouterView } from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue';
import { onMounted } from 'vue';
import { getResource, setCSSRootVariables } from './utils/utils';
import AppHeader from './components/AppHeader.vue';
onMounted(() => {
  setCSSRootVariables(
    { key: 'main-bg-color', value: '#b1fcf9' },
    { key: 'landscape-bg', value: `url('${getResource('/img/background-pc.jpg')}')` },
    { key: 'portrait-bg', value: `url('${getResource('/img/background-mobile.jpg')}')` },
    {
      key: 'resource-base',
      value: import.meta.env.MODE === 'production' ? '/resources/' : 'http://localhost:7777/resources/',
    },
  );
  document.getElementById('app')?.classList.add('container-xl');
});
</script>

<template>
  <AppHeader />
  <!-- <<header>
    img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>-->
  <RouterView />
</template>

<style global lang="scss">
body {
  background: #000000;
}

#app {
  // background: #b1fcf9 url('#{$resource-base}img/background-pc.jpg') no-repeat top center !important;
  background: #000000 url('#{$resource-base}img/background-pc.jpg') no-repeat top center !important;
  background-size: 100% auto !important;
  min-height: 100vh;
  position: relative;
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
