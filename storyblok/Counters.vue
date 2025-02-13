<script setup>

import {useDisplay} from "vuetify";

const { xs } = useDisplay()
const props = defineProps({
  blok: Object
})

</script>

<template>
  <v-row class="mt-4 mx-3">
    <v-col
      v-for="(counter, index) in blok.counters"
      :key="counter._uid"
      cols="6"
      sm="4"
      :class="!index ? 'offset-0 offset-sm-2' : ''"
      class="text-center px-6 pb-6"
      v-editable="counter"
    >
      <v-avatar
        size="100"
        size-sm="140"
        class="mx-auto"
        color="primary"
        style="background-color: #fc0a41;"
      >
        <span class="text-h4 text-sm-h3 font-weight-bold text-secondary">
          {{ counter.number }}
        </span>
      </v-avatar>
      <p
        class="text-center font-weight-bold text-h6 text-sm-h5 mt-5 lato"
        :class="`text-${blok.color_title || 'primary'}`"
      >
        {{ counter.title }}
      </p>
    </v-col>
  </v-row>


</template>

<style scoped lang="scss">

</style>