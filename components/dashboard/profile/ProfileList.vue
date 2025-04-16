<script setup>
import CardHolder from "../../cards/CardHolder.vue";
import {useMainStore} from "~/store/index.js";
import {storeToRefs} from "pinia";
import {useDisplay} from "vuetify";
const mainStore = useMainStore()
const { cats, circunscriptions } = storeToRefs(mainStore)

const { xs } = useDisplay()
const props = defineProps({
  position: Object,
  init_candidates: Array,
})

const sexes = [
  {
    key: 'Mujer',
    plural: 'Mujeres',
    icon: 'female',
  },
  {
    key: 'Hombre',
    plural: 'Hombres',
    icon: 'male',
  }
]

const q_value = ref('')
const selected_sex = ref('')
const selected_powers = ref([])
const selected_circunscription = ref(null)
const selected_state = ref(null)

const filtered_candidates = computed(() => {
  let candidates = props.init_candidates.filter((candidate, idx) => {
    return candidate.position === props.position.id
  })
  if (selected_sex.value) {
    candidates = candidates.filter(candidate =>
      candidate.sex === selected_sex.value)
  }
  if (q_value.value) {
    candidates = candidates.filter(candidate => {
      const name = candidate.full_name.toLowerCase()
      const q = q_value.value.toLowerCase()
      return name.includes(q)
    })
  }
  // console.log("selected_powers.value", selected_powers.value)
  const powers_count = selected_powers.value.length
  if (powers_count > 0 && powers_count < 4) {
    candidates = candidates.filter(candidate => {
      return selected_powers.value.some(power => {
        return candidate.powers.some(candidate_power => {
          return candidate_power === power
        })
      })
    })
  }
  let current_seat = null
  if (selected_state.value) {
    current_seat = cats.value.seat.find(seat => {
      return seat.circunscription === selected_state.value.circunscription && !seat.state
    })
  }
  else if (selected_circunscription.value) {
    current_seat = cats.value.seat.find(seat => {
      return seat.circunscription === selected_circunscription.value && !seat.state
    })
  }
  if (current_seat)
    candidates = candidates.filter(candidate => {
      return candidate.seat === current_seat.id
    })
  return candidates
})

const candidates_by_sex = computed(()=>{
  return sexes.map(sex=>{
    let total_seats = props.position.total_seats / 2
    console.log("total_seats", total_seats)
    if (sex.key === 'Hombre')
      total_seats = Math.floor(total_seats)
    else
      total_seats = Math.ceil(total_seats)
    const candidates = filtered_candidates.value.filter(
          cand => cand.sex === sex.key)
    return {
      ...sex,
      candidates,
      total_seats,
    }
  })
})

</script>

<template>
  <v-card
    :color="position.color_light"
    tile
    class="py-3 px-1 px-md-3"
  >
    <v-row
      class="mx-n2 mx-md-0"
    >
      <v-col
        cols="12"
        sm="12"
        md="3"
        class="d-flex align-center justify-center py-1 py-md-3"
      >
        <v-text-field
          v-model="q_value"
          label="Buscar por nombre"
          outlined
          density="compact"
          clearable
          base-color="secondary"
          color="white"
          variant="filled"
          bg-color="primary"
          hide-details
          max-width="300"
          min-width="200"
          append-inner-icon="search"
          _append-inner="applyFilters()"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="9"
        class="py-1 py-md-3 d-flex justify-space-around flex-column flex-md-row flex-wrap"
      >
        <div class="d-flex align-center ml-3 justify-center">
          <span
            class="mr-2 text-subtitle-1 text-md-h6 text-primary"
          >
            <v-icon
              v-if="!xs"
              class="mr-1"
              color="info"
            >
              filter_list
            </v-icon>
            Sexo:
          </span>
          <v-chip-group v-model="selected_sex">
            <v-chip
              v-for="sex in sexes"
              :key="sex.key"
              :value="sex.key"
              class="mx-1"
              filter
              variant="elevated"
              color="primary"
            >
              <v-icon
                size="16"
                class="mr-1"
                color="white"
              >
                {{ sex.icon }}
              </v-icon>
              {{ sex.plural }}
            </v-chip>
          </v-chip-group>
        </div>

        <div class="d-flex align-center ml-3 justify-center">
          <span
            class="mr-2 text-subtitle-1 text-md-h6 text-primary"
          >
            <v-icon
              v-if="!xs"
              class="mr-1"
              color="info"
            >
              filter_list
            </v-icon>
            Postulante:
          </span>
          <v-chip-group v-model="selected_powers" multiple>
            <v-chip
              v-for="power in cats.power"
              :key="power.key_name"
              :value="power.key_name"
              class="mx-1"
              filter
              variant="elevated"
              color="info"
            >
              <v-icon
                size="16"
                class="mr-1"
                color="warning"
                >
                {{ power.icon }}
              </v-icon>
              {{ power.key_name }}
            </v-chip>
          </v-chip-group>
        </div>
        <div
          v-if="position.by_circunscription"
          class="d-flex align-center ml-3 justify-center"
        >
          <span
            class="mr-2 text-subtitle-1 text-md-h6 text-primary"
          >
            <v-icon
              v-if="!xs"
              class="mr-1"
              color="info"
            >
              filter_list
            </v-icon>
            Circunscripción:
          </span>
          <v-chip-group
            v-model="selected_circunscription"
          >
            <v-chip
              v-for="circ in circunscriptions"
              :key="circ.id"
              :value="circ.id"
              class="mx-1 text-h6"
              variant="elevated"
              filter
              color="info"
              v-tooltip:bottom="circ.states_text"
            >
              {{ circ.number }}
            </v-chip>
          </v-chip-group>
        </div>
        <div
          v-if="position.by_circunscription"
          class="d-flex align-center ml-3 justify-center"
        >
          <span
            class="mr-2 text-subtitle-1 text-md-h6 text-primary"
          >
            <v-icon
              v-if="!xs"
              class="mr-1"
              color="info"
            >
              filter_list
            </v-icon>
            Estado:
          </span>
          <v-autocomplete
            v-model="selected_state"
            :items="cats.state"
            item-title="short_name"
            return-object
            class="mx-1"
            filter
            variant="solo-filled"
            density="compact"
            clearable
            color="secondary"
            hide-details
            style="min-width: 200px"
          >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.title"
                  :subtitle="`Circunscripción ${item.raw.circunscription}`"
                ></v-list-item>
              </template>
          </v-autocomplete>

        </div>
      </v-col>
      <v-divider
        thickness="4"
      ></v-divider>
      <template v-if="selected_sex || q_value">
        <v-col
          cols="12"
          md="6"
          v-for="candidate in filtered_candidates"
          :key="candidate.id"
        >
          <CardHolder
            :candidate="candidate"
          />
        </v-col>
      </template>
      <template v-else>
        <v-col
          cols="12"
          md="6"
          v-for="sex in candidates_by_sex"
          :key="sex.key"
        >
          <v-card-title class="text-center">
            <v-avatar
              color="info"
              size="36"
            >

              <v-icon
                color="white"
                size="36"
              >
                {{ sex.icon }}
              </v-icon>
            </v-avatar>
            <span class="text-primary ml-2 text-h5">
              <span class="font-weight-bold">
                <span v-if="selected_powers.length === 0">

                  {{sex.candidates.length}}
                </span>
                {{ sex.plural }}
              </span>
              <span v-if="selected_powers.length === 0 &&
                !selected_circunscription && !selected_state">
                ({{sex.total_seats}} Cargos a elegir)
              </span>
            </span>
          </v-card-title>
          <CardHolder
            v-for="candidate in sex.candidates"
            :candidate="candidate"
            class="my-3"
          />
        </v-col>
      </template>
    </v-row>
  </v-card>

</template>

<style scoped lang="scss">

</style>