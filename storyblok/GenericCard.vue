<script setup>
// import { computed, ref, onMounted } from 'vue'
import CommonTitle from "../components/CommonTitle.vue";

// defineProps({ blok: Object });
const props = defineProps({
  blok: Object,
  columns_together: Boolean,
})

const space_class = computed(() => {
  let final_class = props.columns_together ? 'px-0' : 'px-2 px-sm-3'
  final_class += ` text-${props.blok.align_text || 'left'}`
  // if (props.blok.free_class)
  //   final_class += ` ${props.blok.free_class}`
  return final_class
})

const description2 = computed(() => {
  let rich_text = renderRichText(props.blok.description2)
  if (props.blok.is_list) {
    // const splitted_by_line = rich_text.split('</li>')
    // let final_content = ''
    // splitted_by_line.forEach((line, index) => {
    // })
    // console.log('splitted_by_line', splitted_by_line)
    let new_content = rich_text.replace(
        /<sup>/g, '<b class="text-h6 font-weight-bold merri-weather">')
    new_content = new_content.replace(/<\/sup>/g, '</b>')
    return new_content
  }

  return rich_text
})
const color_description = computed(() =>
    props.blok.color_description || 'black')

const variant_card = computed(() => {
  return props.blok.background_color2
    ? props.blok.background_color2 === 'primary'
      ? 'elevated'
      : 'tonal'
    : 'elevated'
})

function orientToAlign(orient) {
  return orient === 'left' ? 'start' : orient === 'right' ? 'end' : 'center'
}

const final_align = computed(() => {
  return orientToAlign(props.blok.align_text)
})

const final_sm_align = computed(() => {
  return orientToAlign(props.blok.align_md)
})

const blok_header = computed(() => {
  return {
    subheader: props.blok.title,
    color_title: props.blok.color_title,
    color_pleca: props.blok.color_pleca,
    align_text: props.blok.align_text,
    align_md: props.blok.align_md,
    is_indirect: true,
  }
})

</script>

<template>

  <v-col
    v-editable="blok"
    :cols="blok.cols"
    :md="blok.md"
    class="py-0 py-sm-3"
    :class="space_class"
    :order="blok.order || 1"
    :order-md="blok.order_md || 1"
  >
    <v-card
      :variant="variant_card"
      :color="blok.background_color2 || 'transparent'"
      :class="`${blok.free_class} text-${blok.align_text} text-sm-${blok.align_md}`"
      class="rounded-0 d-flex flex-column justify-center fill-height py-0 py-sm-4"
      elevation="0"
    >
      <div>
        <CommonTitle
          v-if="blok.title"
          :blok="blok_header"
        />
        <v-card-text v-if="blok.description2" class="py-2 py-sm-4">
          <div
            class="text-text-1 text-sm-subtitle-1 _mt-2 _mt-sm-4 lato"
            v-html="description2"
          ></div>
        </v-card-text>
        <v-card-actions v-if="blok.buttons.length">
          <v-spacer></v-spacer>
          <StoryblokComponent
            v-for="blok in blok.buttons"
            :key="blok._uid"
            :blok="blok"
          ></StoryblokComponent>
          <v-spacer></v-spacer>
        </v-card-actions>
      </div>
    </v-card>
  </v-col>

</template>

<style scoped lang="scss">
.side-title{
  width: 50px;
  height: 8px;
}
.title-no-wrap{
  white-space: normal !important;
}
</style>