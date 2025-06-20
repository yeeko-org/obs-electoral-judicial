<script setup>
import {computed} from "vue";

const props = defineProps({
  blok: Object,
})

const final_color = computed(() => {
  return props.blok.background_color?.color || 'grey-lighten-5'
})


const columns_together = computed(() => {
  return !props.blok.space_between
})

const background_color = computed(() => {
  if (props.blok.texture_back)
    return null
  if (props.blok.background_color_collection)
    return props.blok.background_color_collection
  return props.blok?.background_color?.color || 'transparent'
})

</script>

<template>

  <v-col
    cols="12"
    v-editable="blok"
    class="pa-0 _mb-3"
  >
    <v-sheet
      :color="background_color"
      class="py-3 rounded-0"
      variant="flat"
      :style="{backgroundImage: blok.texture_back ? `url(https://a.storyblok.com/f/327491/2550x3300/3994476a6e/fondo.png)` : ''}"
      :class="blok.free_class"
    >
      <SectionHeader
        v-for="blok in blok?.headers"
        :key="blok._uid"
        :blok="blok"
      />
      <v-row
        v-if="blok.columns?.length"
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
      <StoryblokComponent
        v-for="comp in blok.components"
        :key="comp._uid"
        :blok="comp"
      />
    </v-sheet>
  </v-col>
</template>

<style scoped lang="scss">

</style>