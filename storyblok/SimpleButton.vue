<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const props = defineProps({
  blok: Object
})

const size = computed(() =>
  // :x-large="$breakpoint.is.smAndUp && blok.size == 'x-large'"
  // :large="($breakpoint.is.xs && blok.size == 'x-large') || blok.size == 'large'"
  // :small="blok.size == 'x-large'"
  props.blok.size === 'x-large'
    ? (xs.value ? 'large' : undefined)
    : 'small'
)
const variant = computed(() =>
  // :outlined="blok.style == 'outlined'"
  // :text="blok.style == 'text'"
  props.blok.style === 'outlined'
    ? 'outlined'
    : props.blok.style === 'text'
    ? 'text'
    : 'elevated'
)

</script>

<template>

  <v-btn
    :size="size"
    :variant="variant"
    :color="blok.color || 'black'"
    class="px-5 mx-2"
    id="button_new"
    :class="blok.style ? '' : 'white--text'"
    _click="openDialog"
    :to="blok.to.cached_url || blok.to.url"
    rounded="xl"
  >
    {{blok.button_title}}
  </v-btn>

</template>