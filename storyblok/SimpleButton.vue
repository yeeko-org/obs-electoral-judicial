<script>
export default {
  name: 'SimpleButton',
  props: ['blok'],
  methods:{},  
}
</script>

<template>

  <v-btn
    :x-large="$breakpoint.is.smAndUp && blok.size == 'x-large'"
    :large="($breakpoint.is.xs && blok.size == 'x-large') || blok.size == 'large'"
    :small="blok.size == 'x-large'"
    :outlined="blok.style == 'outlined'"
    :text="blok.style == 'text'"
    :color="blok.color || 'black'"
    class="px-5 mx-2"
    id="button_new"
    :class="blok.style ? '' : 'white--text'"
    _click="openDialog"
    :to="blok.to.cached_url || blok.to.url"
    rounded
  >
    {{blok.button_title}}
  </v-btn>

</template>