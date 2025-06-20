<script setup>
import {useWebStore} from '~/store/web.js'
const webStore = useWebStore()
import { storeToRefs } from 'pinia'
const { global_config } = storeToRefs(webStore)

// import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { xs, mdAndUp, smAndDown } = useDisplay()

const props = defineProps({
  blok: Object,
  is_editable: Boolean,
})

//       logo: null, // require("@/assets/logo.png"),
// const logo = ref(null)
// const menu = ref(false)
// const font_size = computed(() => xs.value ? 12 : 14)

const main_blok = computed(() => {
  if (props.blok) return props.blok
  // console.log('global_config 2', global_config.value)
  const global_c = global_config.value
  console.log('global_c', global_c)
  if (global_c && global_c.header && global_c.header.length > 0)
    return global_c.header[0]
})

const final_buttons = computed(() => {
  if (!main_blok.value) return []
  console.log("main_blok.buttons", main_blok.value.buttons)
  return main_blok.value.buttons || []
})

</script>

<template>
  <v-app-bar
    color="white"
    height="70"
    class="_pt-4 d-flex align-center justify-space-between"
    max-width="1024"
    extension-height="38"
    extended
    _style="padding-left: 120px; padding-right: 120px;"
    elevation="0"
    style="margin-left: auto; margin-right: auto;"
  >
    <template v-slot:default>
      <div
        class="app-width2 align-center py-4"
        style="width: 1024px; margin-left: auto; margin-right: auto;"
      >

        <router-link to="/" _class="d-flex align-center">
          <v-img
            src="~/assets/logo_ibero.png"
            _height="xs ? 64 : 76"
            _width="xs ? 64 : 320"
            :height="xs ? 60 : 40"
            :width="xs ? 190 : 120"
          />
        </router-link>
      </div>

    </template>
    <template v-slot:extension v-if="final_buttons.length">
      <div
        style="width: 1024px; margin-left: auto; margin-right: auto;"
      >
        <v-divider></v-divider>
        <StoryblokComponent
          v-for="blok in final_buttons"
          :key="blok._uid"
          :blok="blok"
          fixed_size="default"
          fixed_variant="text"
          fixed_color="white"
        ></StoryblokComponent>
        <v-divider class="pb-0 pt-0"></v-divider>
      </div>
    </template>
  </v-app-bar>
</template>

<style lang="scss">
  .header-xs{
    margin-left: -10px
  }
  .app-width2{
    margin-left: auto;
    margin-right: auto;
    max-width: 1024px;
  }
</style>
