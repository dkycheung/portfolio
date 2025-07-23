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
    <BouncingIcon v-for="(icon, index) in homeviewList" :key="`svg-${index}`">
      <template #svg>
        <component :is="icon" />
        <!-- <component v-html="icon" /> when icon is svg raw text -->
      </template>
    </BouncingIcon>
    <div class="container container-xl w-100 h-100 d-flex p-0 align-items-stretch title">
      <div class="flex-fill d-flex flex-column justify-content-between">
        <div class="main-panel flex-fill container-fluid align-content-center">
          <div class="row justify-content-center p-2">
            <RouterLink to="/about" class="btn btn-primary">About</RouterLink>
          </div>
          <div class="row justify-content-center p-2">
            <RouterLink to="/case-study" class="btn btn-success">Case Study</RouterLink>
          </div>
        </div>
        <div class="flex-grow-0">
          <h2 class="role1">Web Developer</h2>
          <h2 class="role2">Programmer</h2>

          <!-- <h2 class="role1">
            <svg xmlns="http://www.w3.org/2000/svg">
              <text x="0%" y="100%">Web Developer</text>
            </svg>
          </h2>-->
          <!-- <h2 class="role2">
            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="9vh" view-box="0 0 100 20">
              <text dy="1.0em">Programmer</text>
            </svg>
          </h2> -->
        </div>
      </div>
      <div class="h-100 flex-grow-0">
        <h1 class="name">Dennis Cheung</h1>
      </div>
      <div class="clearfix"></div>
    </div>
  </main>
</template>

<style lang="scss">
.boundary {
  width: 100%;
  position: relative;
  overflow: hidden;

  @include media-breakpoint-up(md) {
    min-height: 600px;
  }
}

.title {
  position: relative;
  // z-index: 10;
  font-family: 'verdana', sans-serif;
}

.name {
  @include outline-text(silver, $secondary, 4px);
  width: 9vh;
  height: $app-height;
  // height: 600px;
  font-size: 9vh;
  font-weight: 700;
  transform: rotate(90deg) translateX(100%);
  transform-origin: right top;
  white-space: nowrap;

  @include media-breakpoint-down(md) {
    height: 90dvh;
  }
}

.btn {
  width: 150px !important;
}

.role {
  @include outline-text(silver, $secondary, 4px);
  font-size: 5vw;
  font-weight: 500;
  // position: absolute;

  & svg {
    // overflow: visible;
    width: 100%;
    height: auto;

    & text {
      fill: silver;
      font-size: 5vw;
      font-weight: bold;
      stroke: $secondary;
      stroke-width: 4px;
      text-anchor: start;
      font-family: 'verdana', sans-serif;
      // dominant-baseline: mathematical;
    }
  }
  @include media-breakpoint-down(md) {
    font-size: 10vw;
    @include outline-text(silver, $secondary, 2px);
  }
}

.role1 {
  @extend .role;
  width: 100%;
}
.role2 {
  @extend .role;
  width: 100%;
}
</style>
