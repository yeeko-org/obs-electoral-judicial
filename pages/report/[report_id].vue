<script setup>
// import { onMounted, ref, nextTick } from 'vue'
// import {useMainStore} from '~/store/index'
const { $preview } = useNuxtApp()
const { report_id } = useRoute().params
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const version = $preview ? 'draft' : 'published'
const story = await useAsyncStoryblok(
    `report/${report_id}`,
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)
// const mainStore = useMainStore()
// const { setDocuments, setGlobalConfig } = mainStore
// const storyblokApi = useStoryblokApi();
// const documents = ref([]);

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

</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>

<style scoped lang="scss">

</style>