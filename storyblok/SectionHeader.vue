<script setup>

import CommonTitle from "../components/CommonTitle.vue";

const props = defineProps({
  blok: Object,
  report_blok: Object,
})

function openDoc(item) {
  console.log('item', item)
  if (!item.file_doc) return
  window.open(item.file_doc.filename, '_blank')
}
</script>

<template>
  <v-col
    v-editable="blok"
    cols="12"
    class="section-header text-center mb-1 pt-2 d-flex flex-column"
  >
    <div class="text-uppercase text-caption mb-4 text-grey-darken-2">
      {{blok.header}}
    </div>
    <v-btn
      v-if="report_blok"
      class="align-self-end mt-n10 float-right mb-n2"
      color="accent"
      variant="tonal"
      icon="file_download"
      v-tooltip="'Descargar'"
      @click="openDoc(report_blok)"
    >
    </v-btn>
    <CommonTitle
      :blok="blok"
    />

    <template v-if="blok.explanation">
      <v-divider class="mt-0 mb-4 mx-auto"/>
      <p
        class="text-h6 font-weight-light mx-auto"
        style="max-width: 700px;"
        v-text="blok.explanation"
      />
    </template>
  </v-col>
</template>

<style lang="scss">
.side-title{
  width: 50px;
  height: 8px;
}

.section-header {
  //font-family: Lato;

  .v-divider {
    border-width: 1px;
    max-width: 50px;
  }

  .poppins {
    //font-family: Poppins !important;
  }
}
</style>