<script setup>
import { onMounted, ref, nextTick } from 'vue'
import {useMainStore} from '~/store/index'
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const story = await useAsyncStoryblok(
    'home',
    { version: 'draft' },
{ customParent: 'https://app.storyblok.com' }
)
const mainStore = useMainStore()
const { setDocuments, setGlobalConfig } = mainStore
const storyblokApi = useStoryblokApi();
const documents = ref([]);

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
onMounted(() => {
  nextTick(() => {
    storyblokApi.get(
      `cdn/stories/documents`,
      {
        version: 'draft'
      }
    ).then(({data}) => {
      // console.log("data", data);
      setDocuments(data.story.content);
      // documents.value = data.story.content;
    });
    storyblokApi.get(
      `cdn/stories`,
      {
        version: 'draft',
        starts_with: "global"
      }
    ).then(({data}) => {
      // console.log("data", data);
      // console.log("setDocuments", setDocuments);
      if (data.stories.length)
        setGlobalConfig(data.stories[0].content);
      // documents.value = data.story.content;
    });
  });
  // console.log("data", data);
  // const document_story = data.stories.find(
  //   (story) => story.slug === "vue"
  // );
  // documents.value = data.stories;

  // useStoryblokBridge(
  //   story.value.id,
  //   (evStory) => (story.value = evStory),
  //   { resolveRelations: ["Article.author"], resolveLinks: "url" } // Bridge Options
  // );
});


</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>
