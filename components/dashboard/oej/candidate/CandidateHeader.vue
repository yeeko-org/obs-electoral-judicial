<script setup>

import HeaderCommon from "~/components/dashboard/generic/HeaderCommon.vue";

import {useMainStore} from '~/store/index.js'
const mainStore = useMainStore()

const props = defineProps({
  main: Object,
  mentions: Array,
  collection_data: Object,
  show_details: {
    type: Boolean,
    default: false,
  },
  parent: String,
})

// const emits = defineEmits(['open-panel'])


</script>

<template>
  <HeaderCommon
    :main="main"
    :show_details="show_details"
    :collection_data="collection_data"
  >
    <template v-slot:title>
      {{ main.id % 2 === 0 ? 'AU' : 'AP' }}
      <span class="text-subtitle-1 font-weight-bold ml-2">

        {{ main.full_name_normalized }}
      </span>
    </template>
  </HeaderCommon>
</template>

<style scoped>

</style>