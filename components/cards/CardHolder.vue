<script setup>
import {useMainStore} from "~/store/index.js";
const mainStore = useMainStore()
const { seats } = storeToRefs(mainStore)

const props = defineProps({
  candidate: {
    type: Object,
    required: true,
  },
})

const seat_full = computed(() => {
  return seats.value[props.candidate.seat] || {}
})

const position_full = computed(() => {
  return seat_full.value.position_full || null
})

const position = computed(() => {
  const pos = position_full.value
  if (!pos) return ''

  const subBody = pos.sub_body || ''
  const subBodyText = subBody ? `de la ${subBody} ` : ''
  const genderPrefix = props.candidate.sex === "Mujer" ? pos.female_name : pos.male_name

  return `${genderPrefix} ${subBodyText}- ${pos.body_full.short_name}`
})

const professional_summary = computed(() => {
  let summary = props.candidate.professional_summary
  if (!summary) return ''
  summary = summary.replace(/\\n/g, '\n')
  // convert paragraphs to <p> tags

  const paragraphs = summary.split('\n').map(paragraph =>
      `<p class="_mb-1">${paragraph}</p>`).join('')
  return paragraphs

})

const powers_title = computed(() => {
  return props.candidate.powers.length > 1
    ? 'Poderes Postulantes' : 'Poder Postulante'
})


</script>

<template>
  <v-sheet
    v-if="candidate"
    color="info"
    class="pt-0 pb-4"
  >

    <v-sheet
      color="secondary"
      height="40"
      class="d-flex align-center"
    >
      <v-sheet
        :color="position_full.color"
        height="46"
        class="num_lista text-h4 d-flex align-center justify-center
          font-weight-bold text-black"
      >
        {{candidate.id}}
      </v-sheet>
      <div class="text-h6 ml-6 text-primary font-weight-bold mt-1">
        {{candidate.full_name_normalized}}
      </div>
    </v-sheet>
    <v-row no-gutters class="mt-4">
      <v-spacer></v-spacer>
      <v-col cols="auto">

        <v-sheet
          :color="position_full.color"
          height="30"
          class="d-flex align-center inverse_circle px-5 text-subtitle-1 text-black"
          text-white
        >
          <b class="mr-2">
            CARGO:
          </b>
          {{position}}
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mt-2 px-4">
      <v-col cols="3" class="d-flex flex-column align-center">
        <v-img
          src="~/assets/profile.png"
          :width="'100%'"
          class="rounded-circle mt-n6"
          max-height="240"
        />
        <div class="d-flex align-center mt-0">
          <v-avatar
            color="white"
            size="36"
          >

            <v-icon
              color="primary"
              size="38"
            >
              {{candidate.sex === 'Hombre' ? 'male' : 'female'}}
            </v-icon>
          </v-avatar>
          <span class="ml-2 text-subtitle-1">

            {{candidate.sex}}
          </span>
        </div>


      </v-col>
      <v-col cols="9" class="mt-2">
        <v-card
          v-if="candidate.powers_full.length > 2"
          variant="outlined"
          color="warning"
        >
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-sheet
                color="warning"
                class="text-primary text-subtitle-2 font-weight-bold px-2"
              >
                {{ powers_title }}:
              </v-sheet>
            </v-col>
            <v-col
              v-for="power in candidate.powers_full"
              :key="power.key_name"
              cols="4"
              class="d-flex align-center pt-2 pb-5"
            >
              <v-icon
                :color="power.color || 'hospital'"
                class="mr-1 ml-1"
                size="36"
              >
                {{power.icon || 'gavel'}}
              </v-icon>
              <div class="power-text text-subtitle-1">
                {{power.name}}
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          v-else
          variant="outlined"
          color="warning"
        >
          <v-row>
            <v-col
              cols="3"
              class="pr-0 pb-0"
            >
              <v-sheet
                color="warning"
                class="text-primary text-subtitle-2 font-weight-bold mb-3 py-1 px-2"
                style="line-height: 1.2rem;"
              >
                {{ powers_title }}
              </v-sheet>

            </v-col>
            <v-col
              v-for="power in candidate.powers_full"
              :key="power.key_name"
              cols="4"
              class="d-flex align-center"
            >

              <v-icon
                :color="power.color || 'hospital'"
                class="mr-1"
                size="36"
              >
                {{power.icon || 'gavel'}}
              </v-icon>
              <div
                class="power-text text-subtitle-1"
                style="color: #52A198;"
              >
                {{power.name}}
              </div>
            </v-col>
          </v-row>

        </v-card>
        <div
          class="text-secondary text-subtitle-1 font-weight-bold mb-1 mt-3"
        >
          FORMACIÓN ACADÉMICA:
        </div>
        <v-row>
          <v-col
            v-for="title in candidate.licenses"
            :key="title.id"
            cols="6"
            class="d-flex align-center pt-1 pb-1 px-2"
          >
            <v-icon
              color="green-lighten-2"
              class="mr-1"
              size="32"
            >
              task_alt
            </v-icon>
            <div>
              <div>
                <span class="power-text">
                  {{title.level}}
                </span>
                <span class="font-weight-light text-year">
                  ({{title.year}})
                </span>
              </div>
              <div class="text-secondary text-caption">

                {{ title.career }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-card-text>
      <div
        class="text-secondary text-subtitle-1 font-weight-bold mb-1 mt-2"
      >
        TRAYECTORIA PROFESIONAL
        <span class="text-subtitle-2" style="color: #9e9e9e;">
          (RESUMEN)
        </span>
      </div>
      <div
        class="text-white paragraph"
        v-html="professional_summary"
      >

      </div>
    </v-card-text>
    <v-card-actions class="mx-3">
      <v-spacer></v-spacer>
      <v-btn
        color="accent"
        variant="outlined"
        @click="$emit('select-candidate', candidate)"
        append-icon="expand_more"
      >
        Mostrar más
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>


  </v-sheet>
</template>

<style scoped lang="scss">
.num_lista{
  border-bottom-right-radius: 80px;
  border-top-right-radius: 80px;
  float: left;
  margin-top: 20px;
  position: relative;
  width: 100px;
}

.inverse_circle{
  border-bottom-left-radius: 80px;
  border-top-left-radius: 80px;
  float: right;
}

.paragraph{
  font-size: 0.85rem;
  white-space: pre-wrap;
  :deep(p) {
    margin-bottom: 0.5rem;
  }
}
.power-text{
  color: white;
  font-weight: 600;
  line-height: 1rem;
}

.text-year{
  font-size: 0.9rem;
  color: #9e9e9e;
}

.rounded-circle{
  border-radius: 50%;
  //overflow: hidden;
}

</style>