<script setup lang="ts">
import { onMounted, ref } from 'vue';

const icon = ref<HTMLElement | null>(null);
onMounted(() => {
  if (!icon.value) return;

  const $i = $(icon.value);
  const $svg = $i.find('svg');
  if ($svg.length > 0) {
    const w = $svg.width() ?? 0;
    const h = $svg.height() ?? 0;
    console.debug('BouncingIcons.onMounted', $svg, $svg.attr('viewBox'), { width: w, height: h });

    if ($svg.attr('viewBox') === undefined && w > 0 && h > 0) {
      const vb = { x: 0, y: 0, width: w, height: h };
      if (vb.width > vb.height) {
        vb.y = (h - w) / 2;
        vb.height = w;
        $svg.attr('height', w);
      } else if (vb.width < vb.height) {
        vb.x = (w - h) / 2;
        vb.width = h;
        $svg.attr('width', h);
      }

      $svg.attr('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`).css({ width: '100%', height: '100%' });
    }
  }
});
</script>

<template>
  <div ref="icon" class="bouncing-icon">
    <i>
      <slot />
    </i>
  </div>
</template>

<style scoped lang="scss">
.bouncing-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  /* line-height: 40px; */
  /* border-radius: 50%; */
  /* background: coral; */
  color: coral;

  z-index: 0;
}

i {
  display: flex;
  place-items: center;
  place-content: center;

  color: var(--color-text);

  & > * {
    // width: 100%;
    // height: 100%;
    display: block;
  }
}
</style>
