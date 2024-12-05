<script setup>
import {useMainStore} from '~/store/index'
const { $preview } = useNuxtApp()
const version = $preview ? 'draft' : 'published'
const story = await useAsyncStoryblok(
    'survey',
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

</script>

<template>
  <v-card elevation="6" style="width: 800px">
    <StoryblokComponent
      v-if="story" :blok="story.content"
    />
  </v-card>
</template>
