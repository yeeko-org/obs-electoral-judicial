<script setup>
import { onMounted, ref, nextTick } from 'vue'
import {useMainStore} from '~/store/index'
const { $preview } = useNuxtApp()
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const version = $preview ? 'draft' : 'published'
const story = await useAsyncStoryblok(
    'home',
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)
const mainStore = useMainStore()
const { setDocuments, setGlobalConfig } = mainStore
const storyblokApi = useStoryblokApi();

useSeoMeta({
  title: 'Observatorio Electoral Judicial',
  ogTitle: 'Observatorio Electoral Judicial',
  description: 'Documentamos, analizamos y difundimos las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025',
  ogDescription: 'Documentamos, analizamos y difundimos las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025',
  ogImage: 'https://oej.yeeko.org/_nuxt/nuevo_logo.ChaL5KSF.png',
})

// onMounted(() => {
//   nextTick(() => {
//     storyblokApi.get(
//       `cdn/stories/documents`,
//       {
//         version: version,
//       }
//     ).then(({data}) => {
//       // console.log("data", data);
//       setDocuments(data.story.content);
//       // documents.value = data.story.content;
//     });
//     storyblokApi.get(
//       `cdn/stories`,
//       {
//         version: version,
//         starts_with: "global"
//       }
//     ).then(({data}) => {
//       if (data.stories.length)
//         setGlobalConfig(data.stories[0].content);
//     });
//   });
// });


</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>
