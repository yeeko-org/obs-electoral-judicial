<script setup>
import CardHolder from "../../cards/CardHolder.vue";

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
        md="6"
        class="d-flex align-center justify-center py-1 py-md-3"
      >
        <v-text-field
          v-model="q_value"
          label="Buscar por nombre"
          outlined
          density="compact"
          clearable
          base-color="primary"
          color="indigo"
          variant="filled"
          bg-color="secondary"
          hide-details
          max-width="300"
          min-width="200"
          append-inner-icon="search"
          _append-inner="applyFilters()"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="py-1 py-md-3"
        _class="d-flex align-center"
      >

        <div class="d-flex align-center ml-3">
          <span
            class="mr-2 text-subtitle-1 text-md-h6 text-primary"
          >Filtrar por sexo:</span>
          <v-chip-group v-model="selected_sex">
            <v-chip
              v-for="sex in sexes"
              :key="sex.key"
              :value="sex.key"
              class="mx-1"
              filter
              variant="outlined"
              color="primary"
            >
              {{ sex.plural }}
            </v-chip>
          </v-chip-group>
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

                {{sex.candidates.length}} {{ sex.plural }}
              </span>
              ({{sex.total_seats}} Cargos a elegir)
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