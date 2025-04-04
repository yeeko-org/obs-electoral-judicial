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

const final_users = computed(() => {
  if (!all_users.value)
    return []
  return all_users.value
})

</script>

<template>
  <v-select
    v-model="final_filters[field]"
    :items="final_users"
    item-title="full_name"
    item-value="id"
    :label="label"
    :variant="is_filter ? 'underlined' : 'outlined'"
    :clearable="is_filter"
    :hide-details="is_filter"
    :density="is_filter ? 'compact' : 'default'"
    style="max-width: 300px; min-width: 200px;"
    class="ml-2"
  >
  </v-select>
</template>

<style scoped>

</style>