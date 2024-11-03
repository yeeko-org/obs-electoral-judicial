<script setup>
import { resizeImg, transformImage } from '~/composables/storyblok_images.js'

const props = defineProps({
  blok: Object
})

</script>

<template>
  <SectionHeader
    v-for="blok in blok?.header"
    :key="blok._uid"
    :blok="blok"
  />
  <v-row
    justify="space-around"
    align="center"
    align-content="center"
    no-gutters
    v-editable="blok"
  >
    <v-col
      v-for="institution in blok.institutions"
      :key="institution._uid"
      cols="10"
      sm="6"
      md="4"
      class="pa-4 align-center justify-space-between"
    >
      <a :href="institution.web_page?.url || ''" target="_blank">
        <v-img
          :src="resizeImg(institution.logo, 350)"
          :alt="`Institución ${institution}`"
          max-height="120"
          max-width="350"
        ></v-img>
      </a>
    </v-col>
  </v-row>

</template>

<style scoped lang="scss">

</style>