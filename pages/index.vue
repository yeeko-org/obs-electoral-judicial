<script setup>
import { onMounted, ref, nextTick } from 'vue'
import {useMainStore} from '~/store/index'
const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const story = await useAsyncStoryblok(
    'home',
    { version: version_sb },
{ customParent: 'https://app.storyblok.com' }
)
const mainStore = useMainStore()
const { setDocuments, setGlobalConfig } = mainStore
const storyblokApi = useStoryblokApi();
const documents = ref([]);

onMounted(() => {
  nextTick(() => {
    storyblokApi.get(
      `cdn/stories/documents`,
      {
        version: version_sb
      }
    ).then(({data}) => {
      // console.log("data", data);
      setDocuments(data.story.content);
      // documents.value = data.story.content;
    });
    storyblokApi.get(
      `cdn/stories`,
      {
        version: version_sb,
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
