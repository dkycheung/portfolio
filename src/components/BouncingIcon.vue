<script setup lang="ts"></script>

<template>
  <div class="bouncing-icon">
    <i>
      <slot />
    </i>
  </div>
</template>

<style scoped>
.bouncing-icon {
  position: absolute;
  /* width: 40px; */
  /* height: 40px; */
  font-size: 30px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  background: coral;
  color: white;

  z-index: 0;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 40px;
  height: 40px;

  color: var(--color-text);
}
</style>
