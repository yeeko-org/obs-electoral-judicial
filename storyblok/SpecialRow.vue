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
    <v-card :color="final_color" class="pb-4 rounded-0" variant="flat">
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
    </v-card>
  </v-col>
</template>

<style scoped lang="scss">

</style>