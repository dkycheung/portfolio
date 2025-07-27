<script setup lang="ts">
import { type CaseListViewConfig } from '@/types/caseView';
// import { formatNewLine } from '@/utils/htmlHelper';
import { getResource } from '@/utils/utils';

defineProps<{
  caseConfig: CaseListViewConfig;
}>();

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
        <div class="d-flex d-flex justify-content-around align-items-end">
          <!-- <span v-if="caseConfig.company" class="company">{{ caseConfig.company }}</span> -->
          <span class="ptitle">{{ caseConfig.title }}</span>
        </div>
        <div class="content row">
          <div class="col-5 row text-center">
            <span v-if="caseConfig.company" class="company">{{ caseConfig.company }}</span>
            <img
              class="trumbnail col-4 mx-auto"
              :src="getResource(caseConfig.thumbnailUrl)"
              :alt="caseConfig.title"
              @error.once="imgError"
            />
          </div>
          <span class="info col-7 d-flex flex-column justify-content-center text-wrap">
            <!-- <div class="title">{{ caseConfig.title }}</div> -->
            <!-- <div class="desc">{{ caseConfig.description }}</div> -->
            <div class="role" v-text="caseConfig.role"></div>
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

    .ptitle {
      // width: 100%;
      font-size: 1.2rem;
    }

    .trumbnail {
      height: 80px;

      width: 80%;
      object-fit: contain;
      margin: 5px;
      padding: 0px;
    }

    .info {
      .desc {
      }
      .role {
        text-align: end;
      }
      .year {
        text-align: end;
      }
    }
  }
}
</style>
