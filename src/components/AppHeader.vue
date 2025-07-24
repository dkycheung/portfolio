<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getResource } from '@/utils/utils';

const router = useRouter();
const route = useRoute();

const canBack = computed(() => route.path !== '/');
// const canBack = computed(() => window.history.length > 1);

watch(
  () => route.path,
  (value, oldValue) => {
    console.debug({ value, oldValue, route: route.path, router });
  },
);

function back(event: Event) {
  // window.history.back();
  event.preventDefault();
  router.back();
}

function contactMe(event: Event) {
  event.preventDefault();
  window.open('mailto:dkycheung@gmail.com', '_blank');
}
</script>

<template>
  <header class="sticky-top">
    <div class="header row">
      <img
        alt="Back"
        class="logo"
        :src="`${getResource('./svg/back-arrow.svg')}`"
        :class="{ disabled: !canBack, 'pe-auto': canBack }"
        @click="back"
      />
      <img alt="Contact Me" class="logo" :src="`${getResource('./svg/mail.svg')}`" @click="contactMe" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 30px;
  justify-items: center;
}

.header {
  height: 100%;
  width: fit-content;
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
