<script setup>

import {useMainStore} from "~/store/index.js";
import {useDisplay} from "vuetify";
import {storeToRefs} from "pinia";
import ProfileList from "../components/dashboard/profile/ProfileList.vue";

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
// const current_position = ref(null)
const init_candidates = ref([])

onMounted(() => {
  avatar_size.value = xs.value ? '50' : '65'
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
    return !position.by_circuit
  })
})

const openPosition = (position) => {
  // current_position.value = position
  selected_tab.value = position.id
  dialog_cards.value = true
}

</script>

<template>
  <v-row class="mt-4 mx-3">
    <v-col
      v-for="position in positions"
      :key="position.id"
      cols="12"
      md="6"
      class="text-center px-2 pb-2"
    >
      <v-card
        color="secondary"
        variant="tonal"
        class="py-3 px-2"
      >
        <v-row>
          <v-col
            cols="4"
            class="d-flex flex-column align-center justify-center"
          >
            <v-avatar
              :size="avatar_size"
              class="mx-auto"
              color="primary"
              style="background-color: #fc0a41;"
            >
              <div class="text-secondary">
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
            <div class="mt-2">
              {{position.total_candidates}} Candidatos
            </div>
          </v-col>
          <v-col cols="8">
            <div
              class="text-h6 font-weight-bold text-primary"
            >
              {{ position.full_name }}
            </div>

            <v-card-actions
              class="text-body-2 mt-3"
            >
              <template v-if="!position.by_circuit">
                <v-spacer></v-spacer>
                <v-btn
                  color="accent"
                  variant="outlined"
                  @click="openPosition(position)"
                >
                  Ver perfiles
                </v-btn>
                <v-spacer></v-spacer>
              </template>
              <v-alert
                v-else
                type="info"
                variant="outlined"
              >
                Próximamente...
              </v-alert>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog
      v-model="dialog_cards"
      :max-width="'100%'"
    >
      <v-card-title class="pa-0">
        <v-tabs
          v-model="selected_tab"
          bg-color="transparent"
          fixed-tabs
          class=""
        >
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