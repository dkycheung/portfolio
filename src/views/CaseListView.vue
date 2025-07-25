<script setup lang="ts">
import { type CaseListViewConfig } from '@/types/caseView';
import CaseListItem from '@/components/CaseListItem.vue';
defineProps<{
  title: string;
  caseList: CaseListViewConfig[];
}>();
</script>

<template style="">
  <h2 class="title">{{ title }}</h2>
  <div class="list-box row row-cols-1 row-cols-lg-2">
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
  @include media-desktop {
    width: 90%;
    margin: 0 auto;
    justify-self: center;
  }
}

.title {
  color: $light;
  flex: 0 0 auto;
  width: 100%;
  text-align: center;
  padding-top: 0.5em;
  margin-top: 0.5em;
}
</style>
