<script setup>
import {useMainStore} from "~/store/index.js";
const mainStore = useMainStore()

const { all_users } = storeToRefs(mainStore)
const props = defineProps({
  final_filters: Object,
  field: String,
  label: {
    type: String,
    default: "Usuario",
  },
  is_filter: Boolean,
  editors: Boolean,
})


</script>

<template>
  <v-switch
    v-model="final_filters[field]"
    :label="label"
    :variant="is_filter ? 'underlined' : 'outlined'"
    :clearable="is_filter"
    hide-details
    :density="is_filter ? 'compact' : 'default'"
    color="accent"
    class="ml-2"
  >
  </v-switch>
</template>

<style scoped>

</style>