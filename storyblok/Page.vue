<script setup>
defineProps({ blok: Object })

// add name to the component

</script>

<template>
  <v-row class="ma-0">
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></StoryblokComponent>
  </v-row>
</template>
