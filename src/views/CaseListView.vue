<script setup lang="ts">
import { CaseListViewConfig } from '@/types/caseView';
import CaseListItem from '@/components/CaseListItem.vue';
import router from '@/router/index';
const props = defineProps<{
  title: string;
  caseList: CaseListViewConfig[];
}>();
console.debug({ title: props.title, list: props.caseList, routes: router.getRoutes() });
</script>

<template>
  <div class="list-box row row-cols-1 row-cols-lg-2">
    <h2 class="title">{{ title }}</h2>
    <CaseListItem
      v-for="(item, index) in caseList"
      :key="index"
      :in="item"
      :case-config="item"
      class="col"
    ></CaseListItem>
  </div>
</template>

<style lang="scss">
.list-box {
  @include media-breakpoint-up(lg) {
    width: 90%;
    margin: 0 auto;
  }
}

.title {
  color: $light;
  flex: 0 0 auto;
  width: 100%;
  text-align: center;
  margin-top: 0.5em;
}
</style>
