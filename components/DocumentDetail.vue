<script setup>
import { resizeImg, transformImage } from '~/composables/storyblok_images.js'
const props = defineProps({
  item: Object,
})
</script>

<template>
<!--  <v-card :color="item.colors[0]" v-editable="item">-->
  <v-card
    color="secondary"
    v-editable="item"
    variant="tonal"
  >
    <div class="d-flex flex-no-wrap flex-column flex-sm-row">
      <v-sheet
        color="secondary"
        class="full-height d-flex justify-center align-center"
      >
        <v-img
          :aspect-ratio="1"
          :src="resizeImg(item.cover, 180)"
          width="170"
          max-height="180"
        ></v-img>
      </v-sheet>
      <div>
        <v-card-subtitle class="text-subtitle-1 title-no-wrap pb-0 pt-3 text-black">
          <span
            v-if="item.type_doc.includes('final')"
            :class="`${item.colors[2]}--text`"
          >{{ item.type_doc }} |</span>
          <span class="text-grey-darken-2">
            {{ item.date_text }}
          </span>
        </v-card-subtitle>
        <v-card-title class="text-h5 title-no-wrap pt-2 font-weight-bold">
          {{ item.name }}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded="lg"
            variant="tonal"
            color="accent"
            :href="item.file_doc ? item.file_doc.filename : ''"
            target="_blank"
            prepend-icon="file_download"
          >
            Descargar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">

.title-no-wrap{
  white-space: normal !important;
}
</style>