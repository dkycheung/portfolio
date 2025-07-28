<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type CaseViewConfig } from '@/types/caseView';
import { getResource } from '@/utils/utils';
import { formatNewLine } from '@/utils/htmlHelper';
// import DOMPurify from 'dompurify';
const props = defineProps<{ config: CaseViewConfig }>();

const htmlContent = ref<string>('');
const sanitizedHtml = ref<string>('');
const backgroundUrl = ref<string>(getResource(props.config.backgroundUrl) ?? '/');

onMounted(async () => {
  try {
    const response = await fetch(getResource(props.config.contentUrl));
    htmlContent.value = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent.value, 'text/html');
    buildFigureFromImage(doc);
    sanitizedHtml.value = doc.body.innerHTML;
  } catch (error) {
    console.error('Failed to load HTML:', error);
    sanitizedHtml.value = '<p>Error loading content</p>';
  }
});

function buildFigureFromImage(d: Document): void {
  const $es = $(d.body).find('img.figure');
  $es.map((i, e) => {
    const css = e.className;
    e.className = '';
    const $e = $(e);
    const desc = $e.attr('alt');
    $e.wrap(`<div class="${css}"><figure></figure></div>`).after(`<figcaption>${desc}</figcaption>`);
    // console.debug({ e, desc, parent: $e.parent() });
  });
}
</script>

<template ref="html-ref">
  <div class="html-header row align-content-between" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <div class="links col align-content-end">
      <a
        v-if="config.siteUrl != undefined"
        :href="config.siteUrl"
        target="_blank"
        class="website-btn icon-link btn btn-secondary justify-content-center"
      >
        <span>Website</span>
        <i class="bi bi-box-arrow-up-right"></i>
      </a>
      <span v-else-if="config.appUrl?.apple != undefined || config.appUrl?.google != undefined">
        <a
          v-if="config.appUrl?.apple != undefined"
          :href="config.appUrl?.apple"
          target="_blank"
          class="app-btn icon-link btn btn-secondary justify-content-center"
        >
          <!-- <span>Website</span> -->
          <i class="bi bi-apple"></i>
        </a>
        <a
          v-if="config.appUrl?.google != undefined"
          :href="config.appUrl?.google"
          target="_blank"
          class="app-btn icon-link btn btn-secondary justify-content-center"
        >
          <!-- <span>Website</span> -->
          <i class="bi bi-google-play"></i>
        </a>
      </span>
      <span v-else>&nbsp;</span>
    </div>
    <h1 class="text-center" v-html="formatNewLine(config.title)"></h1>
    <div class="info col align-content-end">
      <span v-html="formatNewLine(config.role)"></span><br />
      <span v-html="formatNewLine(config.year)"></span>
    </div>
  </div>
  <div v-html="sanitizedHtml" class="inner-html clearfix"></div>
</template>

<style lang="scss">
.html-header {
  // display: flex;
  position: relative;
  width: 100%;
  height: 300px;
  background-size: 100% auto;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  margin-left: 0;
  // align-items: center;
  // justify-content: center;
  text-shadow: 4px 4px $gray-700;

  @include media-mobile {
    min-height: 200px;
    max-height: 300px;
    height: fit-content;
  }

  h1 {
    font-weight: bolder;
    font-size: 5em;
    color: $light;
    @include media-mobile {
      font-size: 2em;
    }
  }

  .links {
    color: $light;
    position: relative;
    top: 20px;
    right: 20px;
    text-align: end;

    @include media-mobile {
      top: 10px;
      right: 10px;
    }

    .website-btn {
      color: $light;
      text-decoration: none;

      @include media-mobile {
        width: fit-content !important;
        height: fit-content !important;
        --bs-btn-padding-y: 0.1rem;
        --bs-btn-padding-x: 0.2rem;
        --bs-btn-font-size: 0.75rem;
        --bs-btn-border-radius: var(--bs-border-radius-sm);
      }
    }

    .app-btn {
      color: $light;
      text-decoration: none;
      width: fit-content !important;
      height: fit-content !important;
      margin: 0 0.2rem;

      @include media-mobile {
        --bs-btn-padding-y: 0.1rem;
        --bs-btn-padding-x: 0.2rem;
        --bs-btn-font-size: 0.75rem;
        --bs-btn-border-radius: var(--bs-border-radius-sm);
      }
    }

    .bi {
      height: unset;
      width: unset;
    }
  }
  .info {
    color: $light;
    position: relative;
    // position: absolute;
    bottom: 20px;
    right: 20px;
    text-align: end;
    @include media-mobile {
      bottom: 10px;
      right: 10px;
      font-size: 0.75rem;
    }
  }
}

.inner-html {
  background-color: antiquewhite;
  padding: 40px 100px;
  height: 100%;
  border-radius: 0 0 10px 10px;
  margin-bottom: 10px;

  @include media-mobile {
    padding: 40px;
  }

  div.figure {
    clear: both;

    @include media-mobile {
      justify-self: center;
      display: block;
    }

    & > figure {
      width: 200px;
      background-color: $secondary;
      padding: 10px;
      margin: 5px;
      border-radius: 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      & figcaption {
        color: $light;
      }

      & img {
        width: 100%;
        height: auto;
        max-height: 200px;
        object-fit: contain;

        @include media-mobile {
          height: 150px;
          width: auto;
          max-width: 200px;
        }
      }
    }

    // fixing outside list overlapping
    &.float-start,
    &.float-sm-start,
    &.float-md-start,
    &.float-lg-start,
    &.float-xl-start,
    &.float-xxl-start {
      position: relative;
      left: -1em;
    }
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  h4,
  h5,
  h6 {
    padding-left: 1em;
  }

  ul,
  ol {
    list-style-position: inside;
    padding-left: 0;

    li {
      text-indent: -1em;
      padding-left: 1em;
    }
  }
}
</style>
