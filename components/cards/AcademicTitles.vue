<script setup>

import {useDisplay} from "vuetify";

const props = defineProps({
  candidate: {
    type: Object,
    required: true,
  },
})


const { xs } = useDisplay()
</script>
<template>
  <div
    class="text-secondary text-subtitle-2 text-md-subtitle-1 font-weight-bold mb-3 mt-3 ml-n1 ml-md-0 mb-md-1"
  >
    FORMACIÓN ACADÉMICA:
  </div>
  <v-row>
    <v-col
      v-for="title in candidate.licenses"
      :key="title.id"
      cols="6"
      class="d-flex align-center pt-1 pb-1 px-2"
    >
      <v-icon
        v-if="!xs"
        color="green-lighten-2"
        class="mr-1"
        size="24"
        size-md="32"
      >
        task_alt
      </v-icon>
      <div>
        <div>
          <span class="power-text">
            {{title.level}}
          </span>
          <span class="font-weight-light text-year">
            ({{title.year}})
          </span>
        </div>
        <div class="text-secondary text-caption">
          <v-icon
            v-if="xs"
            color="green-lighten-2"
            size="x-small"
            size-md="32"
          >
            task_alt
          </v-icon>
          {{ title.career }}
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">

.power-text {
  color: white;
  font-weight: 600;
  line-height: 1rem;
  //@media (max-width: 600px) {
  //  line-height: 0.8rem;
  //}
}

.text-year {
  font-size: 0.9rem;
  color: #9e9e9e;
}

</style>