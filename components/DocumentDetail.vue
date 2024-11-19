<script setup>
import { resizeImg, transformImage } from '~/composables/storyblok_images.js'
const props = defineProps({
  item: Object,
})
</script>

<template>
<!--  <v-card :color="item.colors[0]" v-editable="item">-->
  <v-card
    :color="item.colors[2]"
    color="transparent"
    v-editable="item"
    variant="tonal"
    class="rounded-0"
  >
    <div class="d-flex flex-no-wrap flex-column flex-sm-row">
      <v-sheet
        color="secondary"
        class="full-height d-flex justify-center align-center"
      >
        <v-img
          :aspect-ratio="1"
          :src="resizeImg(item.cover, 170)"
          width="160"
          max-height="170"
        ></v-img>
      </v-sheet>
      <div>
        <v-card-subtitle class="text-subtitle-1 title-no-wrap pb-0 pt-3 text-black">
          <v-chip
            v-if="!item.type_doc.includes('quincenal')"
            :color="item.colors[2]"
            size="small"
            class="mr-2"
          >
            {{ item.type_doc }}
          </v-chip>
          <span
            v-if="!item.type_doc.includes('quincenal') && false"
            :class="`text-${item.colors[2]}`"
          >{{ item.type_doc }} |</span>
          <span class="text-grey-darken-2 lato">
            {{ item.date_text }}
          </span>
        </v-card-subtitle>
        <v-card-subtitle
          v-if="item.subtitle"
          class="text-subtitle-1 title-no-wrap pt-2 font-weight-bold lato text-primary"
        >
          {{ item.subtitle }}
        </v-card-subtitle>
        <v-card-title class="text-h5 title-no-wrap pt-2 font-weight-bold lato">
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