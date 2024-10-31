<script setup>
import { computed, ref, onMounted } from 'vue'
import componentMixin from "~/mixins/componentMixin"
import { useDisplay } from 'vuetify'
import { StoryblokComponent } from 'storyblok-vue'

// Setup responsive display properties
const { xs, mdAndUp, smAndDown } = useDisplay()

// Define props
const props = defineProps({
  blok: Object
})

// Initialize reactive data
const is_mounted = ref(false)

// Computed properties
const style_main_div = computed(() => `margin-${props.blok.image_position}: ${props.blok.image_margin || 410}px`)
const position_top = computed(() => props.blok.image_position === 'top')
const position_image = computed(() => is_image_top.value ? (props.blok.image_position === 'top' ? 'center' : 'top') : props.blok.image_position)
const is_image_top = computed(() => smAndDown.value || props.blok.image_position === 'top')
const max_heigth = computed(() => is_image_top.value ? 180 : 400)
const image_iframe = computed(() => props.blok.video_side && props.blok.video_side.includes('youtube'))
const order_iframe = computed(() => {
  console.log("video_position", props.blok.video_position)
  const video_position = props.blok.video_position || 'left'
  return video_position === 'left' ? 1 : 3
})

// Lifecycle hook
onMounted(() => {
  is_mounted.value = true
})
</script>

<template>
  <v-col
    v-editable="props.blok"
    :cols="props.blok.cols"
    :md="props.blok.md"
    :class="xs ? 'pa-2' : 'pa-3'"
  >
    <v-card
      :color="props.blok.background_color && props.blok.background_color.color || 'transparent'"
      elevation="4"
      class="landing-max-width-section text-center rounded-xl"
    >
      <v-row v-if="image_iframe" no-gutters>
        <v-col cols="12" md="8" class="pa-0" :order="order_iframe" _order="3">
          <iframe
            :src="props.blok.video_side"
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
            {{props.blok.title}}
          </v-card-title>
          <v-card-text v-if="props.blok.description">
            <div class="d-flex flex-column">
              <div class="align-self-start mb-auto black--text text-left">
                <p>
                  {{props.blok.description}}
                </p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <StoryblokComponent
              v-for="blok in props.blok.button"
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
          :src="resizedImg(props.blok.image_side)"
          _min-height="400"
          id="header"
          :contain="!is_image_top"
          _position="is_image_top ? 'center' : props.blok.image_position"
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
              {{props.blok.title}}
            </v-card-title>
            <v-card-text v-if="props.blok.description">
              <div class="d-flex flex-column">
                <div class="align-self-start mb-auto black--text text-left">
                  <p
                    :class="{
                    'body-1': xs,
                    'mt-2': xs,
                    'mt-4': smAndUp,
                    'body-2': smAndUp}"
                  >
                    {{props.blok.description}}
                  </p>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <StoryblokComponent
                v-for="blok in props.blok.button"
                :key="blok._uid"
                :blok="blok"
              ></StoryblokComponent>
            </v-card-actions>
          </div>
        </v-img>
        <div v-if="is_image_top" class="py-6 px-2">
        <v-card-title class="no-wrap">
          {{props.blok.title}}
        </v-card-title>
        <v-card-text v-if="props.blok.description">
          <div class="d-flex flex-column">
            <div class="align-self-start mb-auto black--text text-left">
              <p
                :class="{
                'body-1': xs,
                'mt-2': xs,
                'mt-4': smAndUp,
                'body-2': smAndUp}"
              >
                {{props.blok.description}}
              </p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <StoryblokComponent
            v-for="blok in props.blok.button"
            :key="blok._uid"
            :blok="blok"
          ></StoryblokComponent>
        </v-card-actions>
      </div>
      </template>
    </v-card>
  </v-col>
</template>

<style scoped lang="scss">
</style>