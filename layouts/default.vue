<script setup>

import MainNav from "~/components/web/MainNav.vue";
import Footer from "~/components/web/Footer.vue";


import {nextTick, onMounted} from "vue";
import {useWebStore} from '~/store/web.js'
const storyblokApi = useStoryblokApi();

const { $preview } = useNuxtApp()

const webStore = useWebStore()
const { setDocuments, setAllDocuments, setGlobalConfig } = webStore

const version = $preview ? 'draft' : 'published'

onMounted(() => {
  nextTick(() => {
    // storyblokApi.get(
    //   `cdn/stories/documents`,
    //   {
    //     version: version,
    //   }
    // ).then(({data}) => {
    //   // console.log("data", data);
    //   setDocuments(data.story.content);
    //   // documents.value = data.story.content;
    // });
    // storyblokApi.getAll(
    storyblokApi.getStories({
        version: version,
        starts_with: "report/"
      }
    ).then(({data}) => {
      console.log("data all_documents", data);
      setAllDocuments(data.stories);
      // documents.value = data.story.content;
    });
    storyblokApi.get(
      `cdn/stories`,
      {
        version: version,
        starts_with: "global"
      }
    ).then(({data}) => {
      console.log("data global_config", data);
      if (data.stories.length)
        setGlobalConfig(data.stories[0].content);
    });
  });
});



</script>

<template>
  <v-layout>
<!--  <v-app>-->

    <v-responsive max-width="1024" class="mx-auto">
      <MainNav/>
      <v-main class="" id="app-width">
        <v-container class="_px-1 _px-sm-3 px-0 pt-0" fluid>
          <NuxtPage />
        </v-container>
      </v-main>
    </v-responsive>

  </v-layout>
  <Footer />
<!--  </v-app>-->
</template>

<style lang="scss">
@use '../assets/css/utils.scss' as *;
</style>
