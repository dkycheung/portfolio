<script setup lang="ts">
import { getResource } from '../utils/utils';
</script>

<template>
  <div class="about-panel d-flex flex-column justify-content-center">
    <div class="row align-items-center">
      <div class="col-12 col-md-4 avatar">
        <img class="" :src="getResource(`./img/avatar-l.png`)" title="Dennis Cheung" />
      </div>
      <div class="col-12 col-md-8">
        <p class="fs">
          I am a Full-Stack Web Developer and Programmer based in Hong Kong, with years of experence in C# and
          Javascript. I've have been writing/refactoring code and restful APIs using ASP.Net, connecting DB and thrid
          parties APIs, and building CMS using various CMS firmworks, customizing lists/views, creating Components for
          the needs of client's system.
        </p>
        <p class="fs">
          I also create responsive and interactive web interface. Using HTML5, CSS3 and Javascripts or using modern
          frontend frameworks depend on size of the project, cooperate closely with UX/UI designer to produce the best
          possible visual outcome.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about-panel {
  height: $app-height;

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
