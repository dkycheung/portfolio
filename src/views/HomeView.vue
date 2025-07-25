<script setup lang="ts">
import BouncingIcon from '@/components/BouncingIcon.vue';
import BouncingIcons from '@/utils/bouncingIcon';
import baffle, { BaffleOptions } from 'baffle';
import { onMounted, ref } from 'vue';
import { homeviewList } from '@/components/icons/HomeViewIcons';

const main = ref<HTMLElement | null>(null);

const chars = 'asdfgjkhlqwertyuiopzxcvbnm';

import('@/components/CaseListItem.vue').then(console.log);

onMounted(() => {
  const b = new BouncingIcons($('.bouncing-icon'), $('.boundary'));
  // console.debug({ b });

  const baffleOpt: BaffleOptions = { characters: chars, speed: 100 };
  baffle('#myNameTspan', baffleOpt).start().reveal(2000);
  baffle('#myRole1Tspan', baffleOpt).start().reveal(3000);
  baffle('#myRole2Tspan', baffleOpt).start().reveal(4000);

  b.start();
});
</script>

<template>
  <svg style="display: none">
    <defs>
      <filter id="glow-effect" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  </svg>
  <div class="bottom-panel">
    <svg viewBox="0 0 37.041665 8.995833" id="myRolesSvg" xmlns="http://www.w3.org/2000/svg">
      <defs id="defs1">
        <linearGradient id="linearGradient1">
          <stop style="stop-color: #0700f3; stop-opacity: 1" offset="0" id="stop1" />
          <stop style="stop-color: #ecff00; stop-opacity: 1" offset="0.52556038" id="stop13" />
          <stop style="stop-color: #ac3107; stop-opacity: 1" offset="1" id="stop2" />
        </linearGradient>
        <linearGradient
          xlink:href="#linearGradient1"
          id="linearGradient2"
          x1="35.677586"
          y1="52.132885"
          x2="49.367592"
          y2="52.211395"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(2.406343,0,0,2.4063429,-151.09941,-47.266484)"
        />
      </defs>
      <g id="layer1" style="display: inline" transform="translate(0.24941479,-0.14468504)">
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-variant: normal;
            font-weight: bold;
            font-stretch: normal;
            font-size: 3.87786px;
            font-family: Georgia;
            -inkscape-font-specification: 'Georgia, Bold';
            font-variant-ligatures: normal;
            font-variant-caps: normal;
            font-variant-numeric: normal;
            font-variant-east-asian: normal;
            text-align: start;
            writing-mode: lr-tb;
            direction: ltr;
            text-anchor: start;
            white-space: pre;
            inline-size: 33.3023;
            display: inline;
            fill: url(#linearGradient2);
            fill-opacity: 1;
            stroke: #ffffff;
            stroke-width: 0.079375;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          x="-65.361832"
          y="79.502625"
          id="myRolesText"
          transform="matrix(1.1932636,0,0,0.99872371,78.111334,-76.257227)"
        >
          <tspan x="-65.361832" y="79.502625" id="tspan1">Programmer</tspan>
          <tspan x="-65.361832" y="84.349949" id="tspan2">Web Developer</tspan>
        </text>
      </g>
    </svg>
  </div>
  <div class="right-panel">
    <svg viewBox="0 0 4.19377 33.047497" id="myNameSvg" xmlns="http://www.w3.org/2000/svg">
      <defs id="defs1">
        <linearGradient id="linearGradient1">
          <stop style="stop-color: #0700f3; stop-opacity: 1" offset="0" id="stop1" />
          <stop style="stop-color: #ecff00; stop-opacity: 1" offset="0.52556038" id="stop13" />
          <stop style="stop-color: #ac3107; stop-opacity: 1" offset="1" id="stop2" />
        </linearGradient>
        <linearGradient
          xlink:href="#linearGradient1"
          id="linearGradient2"
          x1="35.677586"
          y1="52.132885"
          x2="49.367592"
          y2="52.211395"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(2.406343,0,0,2.4063429,-151.09941,-47.266484)"
        />
      </defs>
      <g id="layer1" transform="translate(-0.54894798,-0.67416788)">
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-variant: normal;
            font-weight: bold;
            font-stretch: normal;
            font-size: 4.23333px;
            font-family: Georgia;
            -inkscape-font-specification: 'Georgia, Bold';
            font-variant-ligatures: normal;
            font-variant-caps: normal;
            font-variant-numeric: normal;
            font-variant-east-asian: normal;
            text-align: start;
            writing-mode: lr-tb;
            direction: ltr;
            text-anchor: start;
            white-space: pre;
            inline-size: 33.3023;
            display: inline;
            fill: url(#linearGradient2);
            fill-opacity: 1;
            stroke: #ffffff;
            stroke-width: 0.079375;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          x="-65.361832"
          y="79.502625"
          id="myNameText"
          transform="matrix(0,1.0007728,-0.9992278,0,80.946932,65.987095)"
        >
          <tspan x="-65.361832" y="79.502625" id="myNameTspan">Dennis Cheung</tspan>
        </text>
      </g>
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
  </main>
</template>

<style lang="scss">
.boundary {
  width: 100%;
  min-height: $app-height;
  position: relative;
  overflow: hidden;

  @include media-mobile {
    height: $mobile-height-strict;
  }
}

.main-panel {
  position: relative;
  z-index: 20;
  width: 100%;
  height: 100%;
  min-height: $app-height;

  @include media-mobile {
    min-height: unset;
    height: $mobile-height-strict;
  }
}

.right-panel {
  position: absolute;
  z-index: 20;

  top: 0;
  right: 0;
  height: $app-height;
  padding: 15px;

  @include media-mobile {
    height: $mobile-height-strict;
  }

  #myNameSvg {
    max-height: 100%;
    width: 100%;
    font-family: Georgia, 'Times New Roman', Times, serif;

    text {
      stroke: white;
      stroke-width: 0.3px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-opacity: 1;
      fill: url('#linearGradient2');
      fill-opacity: 1;
      font-weight: 800;

      tspan {
        // filter: url('#glow-effect');
      }
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

  padding: 15px;

  @include media-mobile {
    --panel-height: 100px;
    top: calc($mobile-height-strict - var(--panel-height));
  }

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
      fill: url('#linearGradient4');
      fill-opacity: 1;
      font-weight: 800;
    }
  }
}

.btn {
  width: 150px !important;
}
</style>
