<script setup lang="ts">
import { getResource } from '@/utils/utils';
</script>

<template>
  <div class="about-panel d-flex flex-column justify-content-center">
    <div class="row align-items-center">
      <div class="col-12 col-md-4 avatar">
        <img class="" :src="getResource(`./img/avatar-l.png`)" title="Dennis Cheung" />
      </div>
      <div class="col-12 col-md-8 p-4">
        <p class="fs">
          Hi there, I'm Dennis Cheung from Hong Kong. I have been working for years with C# and Javascript, writing &
          refactoring code, building RESTful Apis & working with other web services, database and CMS content, also
          building interactive and responsive web interfaces for front-end users and CMS users with HTML/CSS and various
          frameworks.
        </p>
        <p>
          As a Web Developer, I have had the opportunity to work on variety of projects, ranging from Property Developer
          to Accounting to Food and Beverage Group. Working on these projects helped me to understand the different
          needs and development approach for each type of project. With good communication skill, I provide solutions to
          client, discussing designs with UI/UX designer, and technique specifications with other developers.
        </p>
        <p>
          With knowledges in many other languages (Typescript, SASS, PHP, JAVA, C++ etc) I built up a understanding of
          programming so I can quickly adopte to new language/framworks as needed.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about-panel {
  min-height: $app-height;

  @include media-mobile {
    min-height: unset;
    height: $mobile-height-loose;
  }

  .avatar {
    img {
      width: 100%;
      height: auto;
      clip-path: circle(35%);
      background-color: #dddddd;
      object-position: 6px 24px;
    }
  }

  p {
    color: white;
  }

  .fs {
    line-height: 1.5;
  }

  .fs::first-letter {
    font-size: 2em;
    float: left;
    line-height: 0.8;
    margin: 0.1em 0.2em 0 0;
    padding: 0.2em;
    // background: #333;
    // border-radius: 4px;
  }
}
</style>
