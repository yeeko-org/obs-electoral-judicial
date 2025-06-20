<script setup>

import {useDisplay} from "vuetify";

const { xs } = useDisplay()
const props = defineProps({
  blok: Object
})

const avatar_size = ref('100')

onMounted(() => {
  avatar_size.value = xs.value ? '100' : '140'
})

const offsetFirst = computed(() => {
  const few_counters = props.blok.counters.length <= 3
  return !few_counters ? 'offset-0 offset-sm-2' : ''
})


</script>

<template>
  <v-row class="_mt-4 mx-3">
    <v-col
      v-for="(counter, index) in blok.counters"
      :key="counter._uid"
      cols="12"
      sm="4"
      :class="!index ? offsetFirst : ''"
      class="text-left px-6 pb-6"
      v-editable="counter"
    >
      <span class="text-h3 text-sm-h1">
        {{ counter.number }}
        <span v-if="counter.measure" class="ml-n5">
          {{counter.measure}}
        </span>
      </span>
      <p
        class="text-left text-subtitle-1 mt-5 montse"
      >
        {{ counter.title }}
      </p>
    </v-col>
  </v-row>


</template>

<style scoped lang="scss">

</style>