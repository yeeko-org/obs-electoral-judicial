<script setup>
const { $preview } = useNuxtApp()
const { page_name } = useRoute().params
// definePageMeta({
//   // middleware: 'dashboard',
//   layout: 'banner',
// })

// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const version = $preview ? 'draft' : 'published'
console.log('version', version)
const story = await useAsyncStoryblok(
    `${page_name}`,
    { version: version },
{
  customParent: 'https://app.storyblok.com',
  cache: 'no-cache',
}
)

// console.log('story', story)

// useSeoMeta({
//
// })


</script>

<template>
  <StoryblokComponent
    v-if="story" :blok="story.content"
  />
</template>
