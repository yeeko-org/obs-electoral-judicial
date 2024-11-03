<script setup>

import CommonTitle from "../components/CommonTitle.vue";

const props = defineProps({
  blok: Object,
})

</script>

<template>
  <v-col
    v-editable="blok"
    cols="12"
    class="section-header text-center mb-1 pt-2"
  >
    <div class="text-uppercase text-caption mb-4 text-grey-darken-2">
      {{blok.header}}
    </div>
    <CommonTitle
      :blok="blok"
    />
    <template v-if="blok.explanation">
      <v-divider class="mt-5 mb-4 mx-auto"/>
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
  font-family: Lato;

  .v-divider {
    font-family: Lato;
    border-width: 1px;
    max-width: 50px;
  }

  .poppins {
    font-family: Poppins !important;
  }
  }
</style>