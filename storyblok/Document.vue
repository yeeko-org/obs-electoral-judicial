<script setup>
import { resizeImg, transformImage } from '~/composables/storyblok_images.js'
import dayjs from "dayjs";
const props = defineProps({
  item: Object,
  blok: Object,
})

const color = computed(() => {
  if (!props.item.colors) return 'primary'
  return props.item.colors[0]
})

const final_item = computed(() => {
  if (!props.item.colors){
    let doc = props.blok

    doc.colors = typeDocuments.value[doc.type_doc]
    const date_start = dayjs(doc.start_date.substr(0, 10))
    doc.date_start = date_start
    doc.year = date_start.year()
    doc.month = date_start.month()
    doc.month_year = date_start.format('MMMM YYYY')
    let date_text = ''
    if (doc.type_doc.includes('quincenal')) {
      date_text = date_start.format('[Del] D [al] ')
      const date_end = dayjs(doc.end_date.substr(0, 10))
      date_text += `${date_end.format('D [de] MMMM [de] YYYY')}`
      doc.created_format = date_start.format('D [de] MMMM [de] YYYY')
    }
    else {
      date_text = date_start.format('D/MMM/YYYY')
      doc.created_format = date_start.format('D [de] MMMM [de] YYYY')
    }
    doc.date_text = date_text
    return doc
  }
  return props.item
})

function openDoc(item) {
  if (!item.file_doc) return
  window.open(item.file_doc.filename, '_blank')
}

</script>

<template>
<!--  <v-card :color="item.colors[0]" v-editable="item">-->
  <v-card
    v-if="item"
    :color="item.colors[2]"
    color="transparent"
    v-editable="item"
    variant="tonal"
    class="rounded-0"
  >
    <div class="d-flex flex-no-wrap flex-column flex-sm-row">
      <v-sheet
        :color="item.colors[2]"
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
        <v-card-subtitle
          class="text-subtitle-1 title-no-wrap pb-2 pt-3 text-black"
        >
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
          class="text-subtitle-1 title-no-wrap pb-0 font-weight-bold lato text-primary"
        >
          {{ item.subtitle }}
        </v-card-subtitle>
        <v-card-title
          @click="openDoc(item)"
          class="text-h5 title-no-wrap pt-0 font-weight-bold lato pointer"
        >
          {{ item.name }}
        </v-card-title>
        <v-card-actions>
          <v-spacer v-if="false"></v-spacer>
          <v-btn
            rounded="lg"
            variant="tonal"
            color="accent"
            prepend-icon="visibility"
          >
            Visualizar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            _rounded="lg"
            variant="tonal"
            color="accent"
            @click="openDoc(item)"
            icon="file_download"
            v-tooltip="'Decargar documento'"
          >

          </v-btn>
          <v-spacer v-if="false"></v-spacer>
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