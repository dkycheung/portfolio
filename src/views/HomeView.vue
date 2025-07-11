<script setup lang="ts">
import BouncingIcon from '@/components/BouncingIcon.vue';
import BouncingIcons from '@/utils/bouncingIcon.ts';
import baffle from 'baffle';
import { onMounted, ref } from 'vue';
import { homeviewList } from '@/components/icons/HomeViewIcons';

const main = ref<HTMLElement | null>(null);

const chars = 'asdfgj;khlqwertyuiopzxcvbnm';

onMounted(() => {
  const b = new BouncingIcons($('.bouncing-icon'), $('.boundary'));
  console.debug({ b });

  baffle($('.name').get(0) as HTMLElement, {
    // characters: '█▓▒░▒▓█',
    characters: chars,
    speed: 100,
    // speed: 50,
    // duration: 3000,
    // delay: 1000,
    // iterations: -1,
  })
    .start()
    .reveal(2000);
  baffle($('.role1').get(0) as HTMLElement, {
    characters: chars,
    speed: 100,
  })
    .start()
    .reveal(3000);
  baffle($('.role2').get(0) as HTMLElement, {
    characters: chars,
    speed: 100,
  })
    .start()
    .reveal(4000);

  b.start();
});
</script>

<template>
  <main ref="main" class="boundary">
    <BouncingIcon v-for="(icon, index) in homeviewList" :key="index"><component :is="icon" /> </BouncingIcon>
    <!-- <TheWelcome /> -->
    <div class="container title">
      <h1 class="name">Dennis Cheung</h1>
      <h2 class="role1">Web Developer</h2>
      <h2 class="role2">Programmer</h2>
    </div>
  </main>
</template>

<style lang="scss">
.boundary {
  width: 100%;
  min-height: 600px;
  position: relative;
  overflow: hidden;
}

.title {
  position: relative;
  // z-index: 10;
  font-family: 'verdana', sans-serif;
}

.name {
  @include outline-text(black, $secondary, 4px);
  font-size: 9vw;
  font-weight: 700;
  // position: absolute;
  // top: 0;
  // left: 0;
}

.role {
  @include outline-text(black, $secondary, 4px);
  font-size: 7vw;
  font-weight: 500;
  // position: absolute;
}

.role1 {
  @extend .role;
}
.role2 {
  @extend .role;
}
</style>
