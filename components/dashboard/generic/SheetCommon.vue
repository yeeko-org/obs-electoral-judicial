<script setup>

import {useMainStore} from "~/store/index.js";
import {storeToRefs} from "pinia";
import PanelList from "~/components/dashboard/common/PanelList.vue";
import PanelsResult from "~/components/dashboard/common/PanelsResult.vue";

const mainStore = useMainStore()
const { schemas } = storeToRefs(mainStore)

const props = defineProps({
  full_main: {
    type: Object,
    required: true,
  },
  show_details: {
    type: Boolean,
    default: false,
  },
  collection_data: Object,
})

const final_filters = ref({page: 1, page_size: 40})

const child_collections = computed(() => {
  if (!props.collection_data)
    return []
  // console.log("collection_data", props.collection_data)
  let result = []
  props.collection_data.child_relations.forEach(child => {
    let is_category = false
    if (!child.is_multiple && child.link_type !== "category") {
      // console.log("child", child)
      is_category = true
      // return
    }
    const child_collection = schemas.value.collections_dict[child.child]
    // console.log("child_collection", child_collection)
    const results = props.full_main[`${child.child}s`]
    if (results || !is_category){
      result.push({
        collection_data: child_collection,
        relation: child,
        results: results,
      })
    }

  })
  // console.log("result", result)
  return result
})

// const final_filters = computed(() => {
//   return {}
// })

</script>

<template>
  <v-card
    v-for="child_collection in child_collections"
    :key="child_collection.relation.id"
    class="mb-4"
  >
    <v-card-title class="d-flex">
      {{ child_collection.collection_data.plural_name }}
      <span v-if="child_collection.results" class="ml-2">
        ({{ child_collection.results.length }})
      </span>
      <span v-else class="text-error">
        Sin data heredada!!
      </span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="false"
      >
        Agregar
      </v-btn>
    </v-card-title>
    <v-card-text v-if="child_collection.results">
      <PanelList
        :results="child_collection.results"
        :collection_data="child_collection.collection_data"
        :show_details="show_details"
      />
<!--      <PanelsResult-->
<!--        :results="child_collection.results"-->
<!--        :collection_data="child_collection.collection_data"-->
<!--        :show_details="show_details"-->
<!--        :final_filters="final_filters"-->
<!--        :total_count="child_collection.results.length"-->
<!--      />-->
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>