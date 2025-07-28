<script setup lang="ts">
import { type CaseListViewConfig } from '@/types/caseView';
// import CaseListItem from '@/components/CaseListItem.vue';
import { getResource } from '@/utils/utils';
import { onMounted } from 'vue';
import { Carousel } from 'bootstrap';
import { formatNewLine } from '@/utils/htmlHelper';

const props = defineProps<{
  title: string;
  caseList: CaseListViewConfig[];
}>();
console.log(props.caseList);
function imgError(event: Event) {
  event.preventDefault();
  const img = event.target as HTMLImageElement;
  console.debug(img);
  img.src = getResource('./img/place_holder.png');
}

onMounted(() => {
  const caseCarousel = new Carousel('#caseCarousel');
  caseCarousel.cycle();
  // console.debug(caseCarousel);
});
</script>

<template style="">
  <div class="d-flex flex-column text-center">
    <h2 class="title">{{ title }}</h2>
    <div id="caseCarousel" class="carousel slide align-self-center" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          v-for="(item, index) in caseList"
          :key="index"
          data-bs-target="#caseCarousel"
          :class="{ active: index === 0 }"
          :data-bs-slide-to="index"
          :aria-label="item.title"
        ></button>
      </div>
      <div class="carousel-inner">
        <RouterLink
          v-for="(item, index) in caseList"
          :key="index"
          :to="`${item.path}`"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img class="d-block w-100" :src="getResource(item.backgroundUrl)" :alt="item.title" @error.once="imgError" />
          <div class="carousel-caption d-block">
            <div class="ptitle h4" v-text="formatNewLine(item.title)"></div>
            <div class="company h5" v-text="formatNewLine(item.company)"></div>
            <div class="role" v-html="formatNewLine(item.role)"></div>
            <div class="year" v-text="formatNewLine(item.year)"></div>
          </div>
        </RouterLink>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#caseCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#caseCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- <div class="list-box row row-cols-1 row-cols-lg-2">
    <CaseListItem
      v-for="(item, index) in caseList"
      :key="index"
      :in="item"
      :case-config="item"
      class="col"
    ></CaseListItem>
  </div> -->
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

#caseCarousel {
  width: 400px;
  height: 600px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;

  @include media-mobile {
    max-width: 100%;
  }

  .carousel-item {
    width: 400px;
    height: 600px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .carousel-caption {
      text-shadow: 2px 2px $gray-800;
    }
  }
}
</style>
