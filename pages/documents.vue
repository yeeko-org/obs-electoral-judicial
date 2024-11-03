<script setup>
const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const story = await useStoryblok('documents', { version: version_sb })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
