<script setup>

import {nextTick, onMounted} from "vue";
const storyblokApi = useStoryblokApi();

const { $preview } = useNuxtApp()


const version = $preview ? 'draft' : 'published';

</script>

<template>
  <v-app>
    <v-responsive max-width="1024" class="mx-auto">
      <v-main class="" id="app-width">
        <v-container class="_px-1 _px-sm-3 px-0 pt-0" fluid>
          <NuxtPage />
        </v-container>
      </v-main>
    </v-responsive>
<!--    <Footer />-->
  </v-app>
</template>

<style lang="scss">
@use '../assets/css/utils.scss' as *;
</style>
