<script>
import componentMixin from "~/mixins/componentMixin"
import { useDisplay } from 'vuetify'
const { xs, mdAndUp, smAndDown } = useDisplay()

export default {
  name: 'GenericCard',
  props: ['blok'],
  data(){
    return {
      is_mounted: false,
      is_left: false,
    }
  },
  mixins: [componentMixin],
  computed:{
    xs: ()=> xs,
    smAndDown: ()=> smAndDown,
    smAndUp: ()=> mdAndUp,
    style_main_div(){
      return `margin-${this.blok.image_position}: ${this.blok.image_margin || 410}px`
    },
    position_top(){
      return this.blok.image_position === 'top'
    },
    position_image(){
      return this.is_image_top ?
        this.blok.image_position === 'top'
          ? 'center'
          : 'top'
        : this.blok.image_position
    },
    is_image_top(){
      return smAndDown || this.blok.image_position === 'top'
    },
    max_heigth(){
      return this.is_image_top
        ? 180
        : 400
    },
    image_iframe(){
      return this.blok.video_side && this.blok.video_side.includes('youtube')
    },
    order_iframe(){
      console.log("video_position", this.blok.video_position)
      const video_position = this.blok.video_position || 'left'
      return video_position === 'left' ? 1 : 3
    },
  },
  mounted(){
    this.is_mounted = true
  },
}

</script>

<template>
  <v-col
    v-editable="blok"
    :cols="blok.cols"
    :md="blok.md"
    :class="xs ? 'pa-2' : 'pa-3'"
  >
    <v-card
      :color="blok.background_color && blok.background_color.color || 'transparent'"
      elevation="4"
      class="landing-max-width-section text-center rounded-xl"
    >
      <v-row v-if="image_iframe" no-gutters>
        <v-col cols="12" md="8" class="pa-0" :order="order_iframe" _order="3">
          <iframe
            :src="blok.video_side"
            title="YouTube video player"
            width="100%"
            :height="xs ? 200 : 400"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </v-col>
        <v-col
          cols="12"
          md="4"
          order="2"
          class="d-flex flex-column justify-center"
        >
          <v-card-title class="no-wrap">
            {{blok.title}}
          </v-card-title>
          <v-card-text v-if="blok.description">
            <div class="d-flex flex-column">
              <div class="align-self-start mb-auto black--text text-left">
<!--                <p-->
<!--                  :class="{-->
<!--                    'body-1': xs,-->
<!--                    'mt-2': xs,-->
<!--                    'mt-4': smAndUp,-->
<!--                    'body-2': smAndUp}"-->
<!--                >-->
                <p>
                  {{blok.description}}
                </p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <StoryblokComponent
              v-for="blok in blok.button"
              :key="blok._uid"
              :blok="blok"
            ></StoryblokComponent>
          </v-card-actions>
        </v-col>
      </v-row>
      <template v-else>
        <v-img
          :style="`height: ${max_heigth}px`"
          dark
          :src="resizedImg(blok.image_side)"
          _min-height="400"
          id="header"
          :contain="!is_image_top"
          _position="is_image_top ? 'center' : blok.image_position"
          :position="position_image"
          :class="{
            'py-4': xs,
            'py-8': smAndUp}"
        >
          <div
            v-if="!is_image_top"
            :style="style_main_div"
            class="black--text d-flex flex-column justify-center py-6 px-2"
          >
            <v-card-title class="no-wrap">
              {{blok.title}}
            </v-card-title>
            <v-card-text v-if="blok.description">
              <div class="d-flex flex-column">
                <div class="align-self-start mb-auto black--text text-left">
                  <p
                    :class="{
                    'body-1': xs,
                    'mt-2': xs,
                    'mt-4': smAndUp,
                    'body-2': smAndUp}"
                  >
                    {{blok.description}}
                  </p>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <StoryblokComponent
                v-for="blok in blok.button"
                :key="blok._uid"
                :blok="blok"
              ></StoryblokComponent>
            </v-card-actions>
          </div>
        </v-img>
        <div v-if="is_image_top" class="py-6 px-2">
        <v-card-title class="no-wrap">
          {{blok.title}}
        </v-card-title>
        <v-card-text v-if="blok.description">
          <div class="d-flex flex-column">
            <div class="align-self-start mb-auto black--text text-left">
              <p
                :class="{
                'body-1': xs,
                'mt-2': xs,
                'mt-4': smAndUp,
                'body-2': smAndUp}"
              >
                {{blok.description}}
              </p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <StoryblokComponent
            v-for="blok in blok.button"
            :key="blok._uid"
            :blok="blok"
          ></StoryblokComponent>
        </v-card-actions>
      </div>
      </template>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped>
</style>
