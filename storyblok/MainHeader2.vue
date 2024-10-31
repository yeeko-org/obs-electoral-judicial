<script>

import componentMixin from "~/mixins/componentMixin"

export default {
  props: ['blok'],
  mixins: [componentMixin],
  computed: {
  },
}
</script>

<template>
  <v-img
    v-editable="blok"
    :sssrc="blok.cover.filename"
    _src="resizedImg(blok.cover, 1300)"
    :min-height="blok.height *.68 || 300"
    _max-height="blok.height || 440"
    id="header2"
    :class="{'py-2': $breakpoint.is.xs,
      'py-4': $breakpoint.is.smAndUp}"
  >
    <v-row
      mb-1
      class="landing-max-width-section px-3"
      :class="blok.align_content"
    >
      <v-col cols="12" sm="7" md="6" class="px-6" order="1">
        <p
          class="font-weight-bold"
          _class="`primary--text`"
          _wclass="{'text-h6': $breakpoint.is.xs,
                    'text-h5': $breakpoint.is.smAndUp,
                    'mt-4': $breakpoint.is.xs,
                    'mt-12': $breakpoint.is.smAndUp,}"
          :class="`
            text-${$breakpoint.is.xs ? 'h6' : 'h5'}
            mt-${$breakpoint.is.xs ? '4' : '12'}`"
          :style="{'color': blok.title_color ? blok.title_color.color : '#512da8'}"
        >
          <span
            :class="{'white-back':blok.back_text}"
          >
            {{blok.title}}
          </span>
        </p>
        <p
          v-if="blok.explain"
          class="text--darken-2 text-body-2"
          :style="{'color': blok.subtitle_color ? blok.subtitle_color.color : '#f40000'}"
        >
          <span :class="{'white-back':blok.back_text}">
            {{blok.explain}}
          </span>
        </p>
        <v-card-actions class="my-4"><!-- v-if="!want_add">-->
          <v-spacer v-if="true"></v-spacer>
          <component
            v-for="blok2 in blok.call_block"
            :key="blok2._uid"
            v-editable="blok2"
            :blok="blok2"
            :is="blok2.component"
          ></component>
          <v-spacer v-if="true"></v-spacer>
        </v-card-actions>
      </v-col>
      <v-col
        cols="10"
        sm="5"
        md="6"
        order="2"
        offset="1"
        offset-sm="0"
        class="mb-sm-n6 mb-md-n12 mb-0"
      >
        <v-img
          v-editable="blok"
          :sssrc="blok.cover.filename"
          :src="resizedImg(blok.cover, 1300)"
          id="image-map"
        >
        </v-img>

      </v-col>
    </v-row>
  </v-img>
</template>

<style lang="scss">
#header2 {
  background: rgb(0,127,169);
  background: linear-gradient(180deg, rgba(0,127,169,1) 0%, rgba(0,89,140,1) 30%, rgba(0,47,108,1) 100%);
}
.white-back {
  background: rgba(256, 256, 256, 0.15);
}
#image-map{
   background-size: contain;
}

</style>
