<script setup>
const { $preview } = useNuxtApp()
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const version = $preview ? 'draft' : 'published'
// const storyblokApi = useStoryblokApi();
const story = await useAsyncStoryblok(
    'home',
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)

// console.log('story', story)

useSeoMeta({
  title: 'Desplazamiento Interno en México',
  ogTitle: 'Desplazamiento Interno en México',
  description: 'Documentamos y divulgamos sobre eventos de desplazamiento interno en México.',
  ogDescription: 'Documentamos y divulgamos sobre eventos de desplazamiento interno en México.',
  // ogImage: 'https://oej.yeeko.org/_nuxt/nuevo_logo.ChaL5KSF.png',
})


</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>
