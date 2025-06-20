<script setup>

import SelectGroup from "~/components/dashboard/common/SelectGroup.vue";

const props = defineProps({
  is_massive_edit: Boolean,
  is_edit: Boolean,
  full_main: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <v-col cols="12" class="d-flex pa-0 align-center">

    <SelectGroup
      filter_group_name="sources"
      :main_object="full_main"
      forced_level="subtype"
    />
    <v-chip
      v-if="full_main.has_content"
      class="ml-2"
      color="green"
      label
    >
      Es scrappeable
    </v-chip>
  </v-col>
  <v-col cols="12" v-if="full_main.scraper_message">
    <v-sheet color="red lighten-5" class="px-2 py-1">
      {{full_main.scraper_message}}
    </v-sheet>
  </v-col>
</template>

<style scoped>

</style>