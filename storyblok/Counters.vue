<script setup>

import {useMainStore} from "~/store/index.js";
import {useDisplay} from "vuetify";
import {storeToRefs} from "pinia";
import ProfileList from "../components/dashboard/profile/ProfileList.vue";
import {computed} from "vue";

const mainStore = useMainStore()
const { positions_dict } = storeToRefs(mainStore)
const { fetchElements } = mainStore

const { xs } = useDisplay()
const props = defineProps({
  blok: Object
})


const avatar_size = ref('100')
const selected_tab = ref(null)
const dialog_cards = ref(false)
const dialog_methodology = ref(false)
// const current_position = ref(null)
const init_candidates = ref([])

onMounted(() => {
  avatar_size.value = xs.value ? '60' : '70'
  const params = {
    size: 300,
  }
  fetchElements(['candidate', params]).then((res) => {
    console.log('fetchElements candidates', res)
    init_candidates.value = res.results
  })
})

const positions = computed(() => {
  console.log('positions_dict.value', positions_dict.value)
  return Object.values(positions_dict.value)
})

const ready_positions = computed(() => {
  return positions.value.filter((position) => {
    return position.is_public
  })
})

const openPosition = (position) => {
  // current_position.value = position
  selected_tab.value = position.id
  dialog_cards.value = true
}

const explanation = computed(() => {
  let rich_text = renderRichText(props.blok.explanation)
  if (!rich_text)
    return '-'
  rich_text = rich_text
      .replace(/<p>/g, '<p class="_mt-2 _mt-sm-4 text-body-1 lato">')
      .replace(/<ul>/g, '<ul class="ml-6 _mt-0 text-body-1 _mt-sm-1 lato">')
      .replace(/<ol>/g, '<ol class="ml-4 mt-2 mt-sm-4 text-h6 lato">')
  return rich_text
  // return renderRichText(props.blok.text)
})

</script>

<template>
  <v-row class="mt-4 mx-3">
    <v-col
      v-for="position in positions"
      :key="position.id"
      cols="12"
      md="6"
      class="text-center px-0 pb-0 px-sm-2 pb-sm-2"
    >
      <v-card
        color="info"
        variant="elevated"
        class="py-3 px-2"
      >
        <v-row>
          <v-col
            cols="4"
            class="d-flex flex-column justify-center"
          >
            <v-avatar
              :size="avatar_size"
              class="mx-auto"
              :color="position.color"
            >
              <div class="text-black">
                <div
                  class="text-h6 text-sm-h5 font-weight-bold _mt-n2"
                >

                  {{position.total_seats}}
                </div>
                <div class="text-body-2 mt-n1">
                  cargos
                </div>
              </div>
            </v-avatar>
            <v-sheet class="mt-3 ml-n3 right-circle" :color="position.color_light">
              {{position.total_candidates}} Candidaturas
            </v-sheet>
          </v-col>
          <v-col cols="8">
            <div
              class="text-h6 font-weight-bold"
              :style="`color: ${position.color_light}`"
            >
              {{ position.full_name }}
            </div>

            <v-card-actions
              class="text-body-2 mt-3"
            >
              <template v-if="position.is_public">
                <v-spacer></v-spacer>
                <v-btn
                  color="accent"
                  variant="elevated"
                  class="my-1 px-2 px-md-4 text-decoration-underline"
                  :size="xs ? 'default' : 'large'"
                  elevation="5"
                  @click="openPosition(position)"
                >
                  Explorar perfiles
                </v-btn>
                <v-spacer></v-spacer>
              </template>
              <v-alert
                v-else
                type="info"
                variant="outlined"
                color="grey"
                density="compact"
              >
                Próximamente...
              </v-alert>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      class="d-flex flex-column justify-center align-center"
    >
      <v-btn
        color="accent"
        variant="elevated"
        class="my-4 px-2 px-md-4"
        :size="xs ? 'default' : 'large'"
        elevation="5"
        @click="dialog_cards = true"
      >
        Ver todos los perfiles
      </v-btn>
      <v-btn
        color="accent"
        variant="outlined"
        class="my-4 px-2 px-md-4"
        @click="dialog_methodology = true"
      >
        Nota metodológica
      </v-btn>
    </v-col>

    <v-dialog
      v-model="dialog_methodology"
      max-width="900"
    >
      <v-card
        _class="pa-3"
      >
        <v-card-title class="d-flex align-center px-6">
          <span class="text-h6 text-md-h5 font-weight-bold">
            {{blok.title}}
          </span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="accent"
            variant="text"
            @click="dialog_methodology = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text
          v-if="blok.explanation"
        >
          <div
            class="text-black text-body-1 lato special-paragraph"
            style="white-space: pre-line;"
            v-html="explanation"
          >

          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="dialog_methodology = false"
            color="accent"
            outlined
          >Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog_cards"
      max-width="1320"
      :fullscreen="xs"
    >
      <v-card-title class="pa-0">
        <v-tabs
          v-model="selected_tab"
          bg-color="transparent"
          fixed-tabs
          class=""
        >
<!--          <v-btn-->
<!--            v-if="xs"-->
<!--            icon-->
<!--            color="accent"-->
<!--            variant="elevated"-->
<!--            @click="dialog_cards = false"-->
<!--          >-->
<!--            <v-icon>close</v-icon>-->
<!--          </v-btn>-->
          <v-tab
            v-for="position in ready_positions"
            :value="position.id"
            :base-color="position.color_light"
            :color="position.color"
            slider-color="primary"
            _border="lg"
            _elevation="4"
            class="rounded-t-lg"
            variant="elevated"
          >
            {{ position.short_name }}
          </v-tab>
          <v-spacer v-if="!xs"></v-spacer>
          <v-btn
            icon
            color="accent"
            variant="elevated"
            @click="dialog_cards = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-tabs>
      </v-card-title>
      <v-card color="transparent" style="margin-top: -1px;">
        <v-card-text class="pa-0" >
          <v-tabs-window v-model="selected_tab">
            <v-tabs-window-item
              v-for="position in ready_positions"
              :key="position.id"
              :value="position.id"
            >
              <ProfileList
                :position="position"
                :init_candidates="init_candidates"
              />

            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>


</template>

<style scoped lang="scss">
.num-lista{
  margin-top: 20px;
  position: relative;
  width: 100px;
  @media (max-width: 600px) {
    width: 80px;
  }
}

.special-paragraph {
  //background-color: red;
  :deep(p) {
    //color: blue;
    margin-top: 8px;
  }
  :deep(ul) {
    margin-left: 20px;
  }
  //:deep(ol) {
  //  margin-left: 20px;
  //}
}

.right-circle{
  border-bottom-right-radius: 80px;
  border-top-right-radius: 80px;
  float: left;
}
</style>
