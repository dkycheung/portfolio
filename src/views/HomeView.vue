<script setup lang="ts">
import BouncingIcon from '@/components/BouncingIcon.vue';
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconEcosystem from '@/components/icons/IconEcosystem.vue';
import BouncingIcons from '@/utils/bouncingIcon.ts';
import { onMounted } from 'vue';
onMounted(() => {
  const b = new BouncingIcons($('.bouncing-icon'), $('.boundary'));
  console.debug({ b });
  b.start();
});
</script>

<template>
  <main class="boundary">
    <BouncingIcon><IconEcosystem /></BouncingIcon>
    <BouncingIcon><IconCommunity /></BouncingIcon>
    <!-- <TheWelcome /> -->
    <div class="container">
      <h1 class="">Dennis Cheung</h1>
      <br />
      <h1>Web Developer</h1>
      <br />
      <h1>Programmer</h1>
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
</style>
