<script setup>
const story = await useAsyncStoryblok('home', { version: 'draft' },
{ customParent: 'https://app.storyblok.com' })
</script>

<template>
  <h1>Home</h1>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
