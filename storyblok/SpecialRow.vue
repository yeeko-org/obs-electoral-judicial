<script setup>
const props = defineProps({
  blok: Object,
})

const final_color = computed(() => {
  return props.blok.background_color?.color || 'grey-lighten-5'
})

</script>

<template>

  <v-col cols="12" v-editable="blok" class="px-0 mb-3">
    <v-sheet :color="final_color">
      <SectionHeader
        v-for="blok in blok?.headers"
        :key="blok._uid"
        :blok="blok"
      />
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