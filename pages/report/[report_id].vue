<script setup>
const { $preview } = useNuxtApp()
const { report_id } = useRoute().params
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const version = $preview ? 'draft' : 'published'
const story = await useAsyncStoryblok(
    `report/${report_id}`,
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)
// useHead({
//   title: 'My App',
//   meta: [
//     {
//       name: 'description',
//       content: 'My amazing site.'
//     },
//     {
//       property: 'og:title',
//       content: 'My App'
//     },
//     {
//       property: 'title',
//       content: 'My App 2'
//     },
//     {
//       property: 'titleTemplate',
//       content: 'My App 3'
//     },
//     {
//       property: 'og:description',
//       content: 'My amazing site.'
//     }
//   ],
//   // bodyAttrs: {
//   //   class: 'test'
//   // },
//   // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
// })
useSeoMeta({
  title: `${story.value.content?.document[0].name} - Observatorio Electoral Judicial`,
  ogTitle: `${story.value.content?.document[0].name} (Observatorio Electoral Judicial)`,
  description: 'Documentar y analizar las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025 .',
  type: 'article',
  ogDescription: 'Documentar y analizar las decisiones, ' +
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