<script setup>
import {useMainStore} from "~/store/index.js";
const mainStore = useMainStore()
const { seats, cats } = storeToRefs(mainStore)

const props = defineProps({
  candidate: {
    type: Object,
    required: true,
  },
})

const show_details = ref(false)
const extra_fields = {
  "more_info_text": "HALLAZGOS",
  "professional_text": "Detalles de la experiencia profesional",
  "academic_text": "Complemento de experiencia académica",
}

const extra_fields_full = [
  {
    "key": "professional_summary",
    "title": "TRAYECTORIA PROFESIONAL",
    "subtitle": "Resumen",
    "init_display": true,
  },
  {
    "key": "more_info_text",
    "title": "HALLAZGOS",
    "subtitle": "Conflictos de interés y otros detalles",
  },
  {
    "key": "professional_text",
    "title": "TRAYECTORIA PROFESIONAL COMPLETA",
  },
  {
    "key": "academic_text",
    "title": "Complemento de experiencia académica",
  }
]

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
  return convertParagraphs(summary)
})

const extra_sections = computed(() => {
  // return Object.entries(extra_fields).map(([key, value]) => {
  //   return {
  //     key,
  //     title: value,
  //     text: convertParagraphs(props.candidate[key]),
  //   }
  // })
  return extra_fields_full.map(section => {
    return {
      ...section,
      text: convertParagraphs(props.candidate[section.key]),
    }
  })
})

const powers_title = computed(() => {
  return props.candidate.powers.length > 1
    ? 'Poderes Postulantes' : 'Poder Postulante'
})

const powers_full = computed(() => {
  if(props.candidate.powers_full)
    return props.candidate.powers_full
  return cats.value.power.filter(power =>
      props.candidate.powers.includes(power.key_name))
})

const convertParagraphs = (text) => {
  if (!text) return ''
  text = text.replace(/\\n/g, '\n')
  return text.split('\n').map(paragraph =>
      `<p class="_mb-1">${paragraph}</p>`).join('')
}


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
        {{candidate.full_name}}
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
          old_src="~/assets/profile.png"
          :src="candidate.photo_small || '/assets/profile.png'"
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
          v-if="powers_full.length > 2"
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
              v-for="power in powers_full"
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
              v-for="power in powers_full"
              :key="power.key_name"
              cols="4"
              :offset="powers_full.length === 1 ? 2 : 0"
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
    <v-card-text v-if="candidate.professional_summary">
<!--      <div-->
<!--        class="text-secondary text-subtitle-1 font-weight-bold mb-1 mt-2"-->
<!--      >-->
<!--        TRAYECTORIA PROFESIONAL-->
<!--        <span class="text-subtitle-2" style="color: #9e9e9e;">-->
<!--          (RESUMEN)-->
<!--        </span>-->
<!--      </div>-->
<!--      <div-->
<!--        class="text-white paragraph"-->
<!--        v-html="professional_summary"-->
<!--      >-->

<!--      </div>-->
      <template
        v-for="section in extra_sections"
        :key="section.key"
      >

        <div
          v-if="section.init_display || show_details"
        >
          <div
            class="text-secondary text-subtitle-1 font-weight-bold mb-1 mt-3"
          >
            {{section.title}}
            <span
              v-if="section.subtitle"
              class="text-subtitle-2"
              style="color: #9e9e9e;"
            >
              ({{section.subtitle}})
            </span>
          </div>
          <div
            class="text-white paragraph"
            v-html="section.text"
          >
          </div>
        </div>



      </template>
    </v-card-text>
    <v-card-actions class="mx-3" v-if="candidate.professional_summary">
<!--      <v-btn-->
<!--        icon-->
<!--      >-->

<!--      </v-btn>-->
      <v-spacer></v-spacer>
      <v-btn
        color="accent"
        variant="outlined"
        :append-icon="show_details ? 'expand_less' : 'expand_more'"
        @click="show_details = !show_details"
      >
        {{ show_details ? 'Ocultar detalles' : 'Ver ficha completa' }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-text v-else>
      <v-alert
        color="secondary"
        type="info"
        class="text-center"
        variant="outlined"
      >
        Estamos construyendo su perfil completo, pronto estará disponible
      </v-alert>
    </v-card-text>



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
  border-radius: 200px;
  //overflow: hidden;
}

</style>