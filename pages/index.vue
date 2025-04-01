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
const { setDocuments, setGlobalConfig, fetchCatalogs, cats_ready } = mainStore
const storyblokApi = useStoryblokApi();

useSeoMeta({
  title: 'Observatorio Electoral Judicial',
  ogTitle: 'Observatorio Electoral Judicial',
  description: 'Documentación, análisis y difusión las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025',
  ogDescription: 'Documentación, análisis y difusión las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025',
  ogType: 'website',
  ogImage: 'https://oej.yeeko.org/_nuxt/nuevo_logo.ChaL5KSF.png',
})

onMounted(() => {
  fetchCatalogs()
})

</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>
