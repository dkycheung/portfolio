<script setup lang="ts">
import { CaseListViewConfig } from '@/types/caseView';
import { getResource } from '@/utils/utils';

const props = defineProps<{
  caseConfig: CaseListViewConfig;
}>();
console.debug({ props });

function imgError(event: Event) {
  event.preventDefault();
  const img = event.target as HTMLImageElement;
  console.debug(img);
  img.src = getResource('./img/place_holder.png');
}
</script>

<template>
  <div>
    <RouterLink :to="`${caseConfig.path}`" class="item">
      <div class="link">
        <h5 class="title col-12">{{ caseConfig.title }}</h5>
        <div class="content row">
          <img
            class="trumbnail col-4"
            :src="getResource(caseConfig.thumbnailUrl)"
            :alt="caseConfig.title"
            @error.once="imgError"
          />
          <span class="info col d-flex flex-column justify-content-center text-wrap">
            <div class="desc">{{ caseConfig.description }}</div>
            <div class="year">{{ caseConfig.year }}</div>
          </span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss">
.item {
  text-decoration: none;
  color: $light;

  .link {
    border-radius: 10px;
    background-color: #00000077;

    .content {
      border-radius: 0 0 10px 10px;
      background-color: #55555577;
      margin: 0px;
    }

    .title {
      width: 100%;
    }

    .trumbnail {
      height: 140px;
      object-fit: contain;
      margin: 5px;
      padding: 0px;
    }

    .info {
      .desc {
      }
      .year {
        text-align: end;
      }
    }
  }
}
</style>
