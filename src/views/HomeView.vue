<script setup lang="ts">
import BouncingIcon from '@/components/BouncingIcon.vue';
import BouncingIcons from '@/utils/bouncingIcon';
import baffle, { BaffleOptions } from 'baffle';
import { onMounted, ref } from 'vue';
import { homeviewList } from '@/components/icons/HomeViewIcons';

const main = ref<HTMLElement | null>(null);
const myName = ref<HTMLElement | null>(null);

const chars = 'asdfgjkhlqwertyuiopzxcvbnm';

import('@/components/CaseListItem.vue').then(console.log);

onMounted(() => {
  const b = new BouncingIcons($('.bouncing-icon'), $('.boundary'));
  // console.debug({ b });
  console.debug({ value: myName.value, children: myName.value.children });
  const baffleOpt: BaffleOptions = { characters: chars, speed: 100 };
  baffle('#myNameTspan', baffleOpt).start().reveal(2000);
  baffle('#myRole1Tspan', baffleOpt).start().reveal(3000);
  baffle('#myRole2Tspan', baffleOpt).start().reveal(4000);

  b.start();
});
</script>

<template>
  <div class="bottom-panel">
    <svg ref="myRoles" id="myRolesSvg" viewBox="52 0 140 50" xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="linearGradient1" inkscape:collect="always" gradientUnits="userSpaceOnUse">
        <stop style="stop-color: #708b3d; stop-opacity: 1" offset="0" id="stop1" />
        <stop style="stop-color: #ac3107; stop-opacity: 1" offset="1" id="stop2" />
      </linearGradient>
      <filter id="glow-effect" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <text
        xml:space="preserve"
        id="myRolesText"
        width="100%"
        height="100%"
        x="60"
        y="1em"
        style="font-size: 16px"
        filter="url(#glow-effect)"
      >
        <tspan id="myRole1Tspan">Programmer</tspan>
      </text>
      <text
        xml:space="preserve"
        id="myRolesText"
        x="60"
        y="1em"
        dy="1.5em"
        style="font-size: 16px"
        filter="url(#glow-effect)"
      >
        <tspan id="myRole2Tspan">Web Developer</tspan>
      </text>
    </svg>
  </div>
  <div class="right-panel">
    <svg ref="myName" id="myNameSvg" viewBox="0 0 20 120" xmlns="http://www.w3.org/2000/svg">
      <linearGradient
        id="linearGradient1"
        inkscape:collect="always"
        gradientUnits="userSpaceOnUse"
        x1="35.789677"
        y1="50.729588"
        x2="89.103249"
        y2="50.729588"
        gradientTransform="matrix(2.406343,0,0,2.4063429,-86.228602,-131.03148)"
      >
        <stop style="stop-color: #708b3d; stop-opacity: 1" offset="0" id="stop1" />
        <stop style="stop-color: #ac3107; stop-opacity: 1" offset="1" id="stop2" />
      </linearGradient>
      <filter id="glow-effect" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <text
        xml:space="preserve"
        id="myNameText"
        transform="matrix(0,1,-1,0,0,0)"
        textLength="110"
        lengthAdjust="spacingAndGlyphs"
        width="100%"
        height="100%"
        x="0"
        y="-5"
        filter="url(#glow-effect)"
      >
        <tspan id="myNameTspan">Dennis Cheung</tspan>
      </text>
    </svg>
  </div>
  <main ref="main" class="boundary">
    <BouncingIcon v-for="(icon, index) in homeviewList" :key="`svg-${index}`">
      <template #svg>
        <component :is="icon" />
        <!-- <component v-html="icon" /> when icon is svg raw text -->
      </template>
    </BouncingIcon>
    <div class="main-panel flex-fill container-fluid align-content-center">
      <div class="row justify-content-center p-2">
        <RouterLink to="/about" class="btn btn-primary">About</RouterLink>
      </div>
      <div class="row justify-content-center p-2">
        <RouterLink to="/job-exp" class="btn btn-success">Past Cases</RouterLink>
      </div>
    </div>

    <!-- <div class="container container-xl w-100 h-100 d-flex p-0 align-items-stretch title">
      <div class="flex-fill d-flex flex-column justify-content-between">
        <div class="main-panel flex-fill container-fluid align-content-center">
          <div class="row justify-content-center p-2">
            <RouterLink to="/about" class="btn btn-primary">About</RouterLink>
          </div>
          <div class="row justify-content-center p-2">
            <RouterLink to="/job-exp" class="btn btn-success">Past Cases</RouterLink>
          </div>
        </div>
        <div class="flex-grow-0">
          <h2 class="role1">Web Developer</h2>
          <h2 class="role2">Programmer</h2>
        </div>
      </div>
      <div class="h-100 flex-grow-0">
        <h1 class="name">Dennis Cheung</h1>
      </div>
      <div class="clearfix"></div>
    </div> -->
  </main>
</template>

<style lang="scss">
.boundary {
  width: 100%;
  min-height: $app-height;
  position: relative;
  overflow: hidden;

  @include media-breakpoint-down(md) {
    // height: 100vh;
    // max-height: 100%;
    // height: calc(100vh - 30);
  }
}

.title {
  position: relative;
  // z-index: 10;
  // font-family: 'verdana', sans-serif;
}

.main-panel {
  position: relative;
  z-index: 20;
  width: 100%;
  height: 100%;
  min-height: $app-height;
}

.right-panel {
  position: absolute;
  z-index: 20;

  top: 0;
  right: 0;
  height: $app-height;

  .name {
    @include outline-text(silver, $secondary, 4px);
    // width: 9vh;
    width: $app-height;
    // height: $app-height;
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

  #myNameSvg {
    max-height: 100%;
    height: auto;
    width: 100%;
    font-family: Georgia, 'Times New Roman', Times, serif;

    text {
      stroke: white;
      stroke-width: 0.3px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-opacity: 1;
      fill: url('#linearGradient1');
      fill-opacity: 1;
      font-weight: 800;
    }
  }
}
.bottom-panel {
  --panel-height: 160px;

  position: absolute;
  z-index: 20;

  top: calc($app-height - var(--panel-height));
  left: 0;

  width: 100%;
  height: var(--panel-height);

  #myRolesSvg {
    transform-origin: 0 0;

    max-height: 100%;
    height: 100%;
    max-width: 70%;
    font-family: Georgia, 'Times New Roman', Times, serif;

    text {
      stroke: white;
      stroke-width: 0.3px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-opacity: 1;
      // fill: white;
      fill: url('#linearGradient1');
      fill-opacity: 1;
      font-weight: 800;
    }
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
