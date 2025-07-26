<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getResource } from '@/utils/utils';

const router = useRouter();
const route = useRoute();

const canBack = computed(() => route.path !== '/');

function back(event: Event) {
  event.preventDefault();
  router.back();
}
function forward(event: Event) {
  event.preventDefault();
  router.forward();
}
</script>

<template>
  <header class="sticky-top">
    <div class="header row">
      <img
        alt="Back"
        class="logo"
        :src="`${getResource('./svg/back-arrow.svg')}`"
        :class="{ disabled: !canBack, 'pe-auto': canBack, 'pe-none': !canBack }"
        @click="back"
      />
      <img
        alt="Forward"
        class="logo"
        style="transform: rotate(180deg)"
        :src="`${getResource('./svg/back-arrow.svg')}`"
        :class="{}"
        @click="forward"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  justify-items: center;
}

.header {
  // position: absolute;
  height: 30px;
  width: fit-content;
  margin-top: 0;
  padding: 3px 5px 5px 5px;
  box-sizing: content-box;
  background-color: $dark;
  border-radius: 0 0 18px 18px;
}

.logo {
  display: block;
  margin: 0 auto;
  width: auto;
  height: 100%;
  fill: #0bd8acff;
}
</style>
