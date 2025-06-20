<script setup>

import HeaderCommon from "~/components/dashboard/generic/HeaderCommon.vue";
import SelectGroup from "~/components/dashboard/common/SelectGroup.vue";

const props = defineProps({
  main: Object,
  mentions: Array,
  collection_data: Object,
  is_small: Boolean,
  show_details: {
    type: Boolean,
    default: false,
  },
  parent: String,
})

</script>

<template>
  <HeaderCommon
    :main="main"
    :show_details="show_details"
    :collection_data="collection_data"
  >
    <template #title>
      <v-card
        color="blue"
        rounded="lg"
        variant="outlined"
        class="mx-2 d-flex flex-column"
      >
        <SelectGroup
          :main_object="main"
          filter_group_name="word_lists"
          main_collection_name="word_list"
          field="cluster"
          forced_level="subtype"
          is_display
        />
      </v-card>
      <span class="text-subtitle-1 font-weight-bold">
        {{ main.name }}
      </span>
    </template>
    <template #details>
      <div style="max-width: 400px;">

        ({{main.query_words}})
      </div>
    </template>
  </HeaderCommon>
</template>

<style scoped>

</style>