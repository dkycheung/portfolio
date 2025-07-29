<script setup lang="ts">
import { type CaseViewConfig } from '@/types/caseView';
import { formatNewLine } from '@/utils/htmlHelper';
import { getResource } from '@/utils/utils';
import { onMounted, ref } from 'vue';

const props = defineProps<{ config: CaseViewConfig }>();

const htmlContent = ref<string>('');
const sanitizedHtml = ref<string>('');
const htmlRef = ref<HTMLDivElement>(null);
const backgroundUrl = ref<string>(getResource(props.config.backgroundUrl) ?? '/');
const modal = ref<HTMLDivElement>(null);
const modalConfig = ref({
  show: false,
  img: '',
  caption: '',
});

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

  const figures = htmlRef.value.getElementsByClassName('figure');
  console.debug({ figures });

  for (let i = 0; i < figures.length; i++) {
    const e = figures[i];
    e.addEventListener('click', onClickFigure);
    console.debug(e);
  }
  console.debug('modal:', modal.value);
});

function buildFigureFromImage(d: Document): void {
  const $es = $(d.body).find('img.figure');
  $es.map((i, e) => {
    const css = e.className;
    e.className = '';
    const $e = $(e);
    const desc = $e.attr('alt');
    $e.wrap(`<div class="${css}"><figure></figure></div>`).after(`<figcaption>${desc}</figcaption>`);
  });
}

function onClickFigure(event: MouseEvent) {
  const target = (event.target as HTMLElement).closest('div.figure');
  // console.log('clicked:', target);
  if (target) {
    const img = target.querySelector('img');
    modalConfig.value = {
      caption: img.alt,
      img: img.src,
      show: true,
    };
    console.debug(target, img, modalConfig.value);
    event.preventDefault();
  }
}

function closeFigure(event: Event) {
  modalConfig.value = { caption: '', img: '', show: false };
  event.preventDefault();
}
</script>

<template>
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
  <div v-html="sanitizedHtml" ref="htmlRef" class="inner-html clearfix" @click="onClickFigure"></div>
  <div id="imgModal" class="modal" :class="{ 'd-none': !modalConfig.show }" ref="modal">
    <span class="close" @click="closeFigure"><i class="bi bi-x-circle"></i></span>
    <img class="modal-content" :src="modalConfig.img" id="imgModalContent" />
    <div id="imgModalCaption">{{ modalConfig.caption }}</div>
  </div>
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
  padding: 40px 15%;
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

  ul {
    &.scope {
      list-style: none;
      padding-left: 0;

      & > li::before {
        font-family: 'bootstrap-icons';
        content: '\F1C7';
        display: inline-block;
        margin-right: 0.5rem;
      }
    }

    &.tech {
      list-style: none;
      padding-left: 0;
      max-width: max(70%, 420px);

      & > li::before {
        font-family: 'bootstrap-icons';
        content: '\F5DB';
        display: inline-block;
        margin-right: 0.5rem;
      }

      ul.tech-list {
        display: flex;
        list-style: none;
        padding-left: 0;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: center;

        & > li {
          display: inline-block;
          text-indent: 0;
          padding: 0.2rem 0.5rem;
          // border: 1px $primary solid;
          border-radius: 0.5rem;
          color: $light;
          background-color: $success;
          margin: 1px;
          flex-grow: 1;
          flex-shrink: 0;
          // flex-basis: 50px;
        }
      }
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

a.new-link {
  &::after {
    font-family: 'bootstrap-icons';
    font-size: 0.75rem;
    content: '\F1C5';
    display: inline-block;
    margin-left: 1.2rem;
  }
}

.modal {
  // display: none;
  --padding-top: 100px;
  --padding-bottom: 150px;
  display: block;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: var(--padding-top);
  overflow: auto;
  background-color: rgba($dark, 0.9);

  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    max-height: calc(100vh - var(--padding-top) - var(--padding-bottom));
    object-fit: contain;
    background-color: transparent;

    @include media-mobile {
      width: 100%;
    }
  }

  #imgModalCaption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: var(--padding-bottom);
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }
  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
