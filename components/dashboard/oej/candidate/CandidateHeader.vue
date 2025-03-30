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

      <span class="text-subtitle-1 font-weight-bold ml-2">

        {{ main.full_name_normalized }}
      </span>
    </template>
    <template v-slot:icon>
      <v-avatar
        :color="main.id % 2 === 0 ? 'light-blue' : 'purple-lighten-1'"
        size="32"
      >
        {{ main.id % 2 === 0 ? 'AU' : 'AP' }}
      </v-avatar>
    </template>
    <template v-slot:details>
      <template
        v-if="main.biography"
      >
        <v-icon
          color="green"
          class="ml-3"
          size="x-large"
        >
          contacts
        </v-icon>
        <span
          class="text-green text-subtitle-1 font-weight-bold ml-1"
        >
          Bio
        </span>
      </template>
      <span
        v-else
      ></span>

    </template>
  </HeaderCommon>
</template>

<style scoped>

</style>