<script setup>

import HeaderCommon from "~/components/dashboard/generic/HeaderCommon.vue";
import SelectGroup from "~/components/dashboard/common/SelectGroup.vue";
import HeaderChip from "~/components/dashboard/common/HeaderChip.vue";
import ScrapeableChip from "~/components/dashboard/source/source/ScrapeableChip.vue";

const props = defineProps({
  main: {
    type: Object,
    required: true,
  },
  show_details: Boolean,
  collection_data: Object,
})

</script>

<template>
  <HeaderCommon
    :main="main"
    :show_details="show_details"
    :collection_data="collection_data"
  >
    <template #title>
      <div>
        <div class="text-cyan-darken-2 text-subtitle-1 mr-2 font-weight-bold">
          {{main.name}}
        </div>
        <div class="text-black text-caption">
          {{main.main_url}}
        </div>
      </div>
    </template>
    <template #details>
      <SelectGroup
        filter_group_name="sources"
        :main_object="main"
        main_collection_name="source"
        forced_level="subtype"
        is_display
      />
      <HeaderChip
        :count="main.note_links_count"
        label="Enlace a nota"
        icon="insert_link"
        label_plural="Enlaces a notas"
        color="purple"
      />
      <ScrapeableChip
        :main="main"
        is_icon
      />
    </template>
  </HeaderCommon>
</template>


<style scoped>

</style>