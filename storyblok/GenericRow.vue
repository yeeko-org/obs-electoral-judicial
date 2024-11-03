<script setup>
import { computed } from 'vue'
const props = defineProps({
  blok: Object,
})

const columns_together = computed(() => {
  return !props.blok.space_between
})


</script>

<template>
  <v-row
    v-editable="blok"
    class="px-2 px-sm-4 py-3"
    :no-gutters="columns_together"
  >
    <StoryblokComponent
      v-for="column in blok.columns"
      :key="column._uid"
      :blok="column"
      :columns_together="columns_together"
    />
  </v-row>
</template>

<style scoped lang="scss">

</style>