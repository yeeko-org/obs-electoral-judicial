<script setup>
import {useMainStore} from "~/store/index.js";
import {useDisplay} from "vuetify";
import default_profile from '~/assets/profile.png';
import woman from '~/assets/Mujer.png';
import man from '~/assets/Hombre.png';
import AcademicTitles from "./AcademicTitles.vue";
import SexChip from "./SexChip.vue";

const mainStore = useMainStore()
const { seats, cats, circunscriptions } = storeToRefs(mainStore)

const { xs, sm } = useDisplay()
const props = defineProps({
  candidate: {
    type: Object,
    required: true,
  },
  init_show_details: {
    type: Boolean,
    default: false,
  },
})

const show_details = ref(false)

const extra_fields_full = [
  {
    "key": "professional_summary",
    "title": "TRAYECTORIA PROFESIONAL",
    "subtitle": "Resumen",
    "init_display": true,
    "cut_text": false,
  },
  {
    "key": "more_info_text",
    "title": "HALLAZGOS",
    "subtitle": "Conflictos de interés y otros detalles",
    "init_display": true,
    "cut_text": true,
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

const opened_details = computed(() => {
  return show_details.value || props.init_show_details
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

const extra_sections = computed(() => {
  let real_sections = extra_fields_full.filter(section => {
    return props.candidate[section.key]
  })

  return real_sections.map(section => {
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

const powers_count = computed(() => {
  return props.candidate.powers.length
})

const title_above = computed(() => {
  if (powers_count.value > 2)
    return true
  if (xs.value && powers_count.value > 1)
    return true
  return false
})

const name_height = computed(() => {
  const is_large = props.candidate.full_name.length > 34 && !sm.value
  if (xs.value)
    return is_large ? 48 : 36
  return is_large ? 64 : 40
})

const circunscription_full = computed(() => {
  if (!seat_full.value.circunscription)
    return null
  return circunscriptions.value.find(circ => {
    return circ.id === seat_full.value.circunscription
  })
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
      :height="name_height"
      class="d-flex align-center"
    >
      <v-sheet
        :color="position_full.color"
        :height="xs ? 40 : 46"
        class="num-lista right-circle text-h5 text-sm-h4 d-flex align-center justify-center
          font-weight-bold text-black"
      >
        {{candidate.num_list || candidate.id}}
      </v-sheet>
      <div
        class="text-subtitle-1 text-sm-h6 ml-2 ml-sm-4 text-primary font-weight-bold mt-1"
      >
        {{candidate.full_name}}
      </div>
    </v-sheet>
    <v-row no-gutters class="mt-4">

      <v-spacer></v-spacer>
      <v-col cols="auto" class="d-flex flex-column">
        <v-sheet
          :color="position_full.color"
          :height="xs ? 26 : 30"
          class="d-flex align-center inverse-circle px-5 text-subtitle-2 text-sm-subtitle-1 text-black"
          text-white
        >
          <b class="mr-2">
            CARGO:
          </b>
          {{position}}
        </v-sheet>
        <div
          v-if="circunscription_full"
          :style="`color: ${position_full.color}`"
          class="d-flex align-center px-5 text-subtitle-1 mr-2 flex-column flex-sm-row"
        >
          <div class="d-flex">

            Circunscripción
            <b class="ml-1">
              {{ seat_full.circunscription }}
            </b>
          </div>
          <div
            :style="`color: ${position_full.color}`"
            class="ml-2 text-caption text-sm-subtitle-2"
          >
            ({{circunscription_full.states_text}})
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-2 px-4">
      <v-col cols="3" class="d-flex flex-column align-center px-1 px-sm-3">
        <v-img
          :src="candidate.photo_small || (candidate.sex === 'Hombre' ? man : woman)"
          :width="'100%'"
          class="rounded-circle mt-n3 mt-sm-n6"
          max-height="240"
        />
        <SexChip v-if="!xs" :sex="candidate.sex"/>

      </v-col>
      <v-col cols="9" class="mt-0 mt-sm-2 d-flex flex-column pt-1 pt-sm-3">
<!--        <v-sheet-->
<!--          v-if="position_full && position_full.by_circunscription && xs"-->
<!--          color="transparent"-->
<!--          height="30"-->
<!--          class="d-flex align-center text-subtitle-1 justify-end pb-4"-->

<!--        >-->
<!--          <span class="mr-2" :style="`color: ${position_full.color}`">-->
<!--            Circunscripción-->
<!--            <b>-->
<!--              {{ seat_full.circunscription }}-->
<!--            </b>-->
<!--          </span>-->

<!--        </v-sheet>-->

        <v-card
          v-if="title_above"
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
              :cols="powers_count === 3 ? 4 : 6"
              class="d-flex align-center pt-2 pb-5"
            >
              <v-icon
                :color="power.color || 'warning'"
                class="mr-1 ml-1"
                :size="xs ? 30 : 36"
              >
                {{power.icon || 'question_mark'}}
              </v-icon>
              <div class="power-text text-body-2 text-sm-subtitle-1">
                {{power.name}}
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          v-else
          variant="outlined"
          color="warning"
          class="d-flex justify-space-between"
          height="50"
        >
          <v-sheet
            color="warning"
            class="text-primary text-body-2 text-sm-subtitle-2 font-weight-bold py-1 px-2"
            width="94"
            style="line-height: 1.2rem;"
          >
            {{ powers_title }}
          </v-sheet>
          <div class="d-flex justify-space-around align-center flex-grow-1 py-0">
            <div
              v-for="power in powers_full"
              :key="power.key_name"
              class="d-flex align-center"
              style="width: 110px;"
            >

              <v-icon
                :color="power.color || 'warning'"
                class="mr-1"
                :size="xs ? 30 : 36"
              >
                {{power.icon || 'gavel'}}
              </v-icon>
              <div
                class="power-text text-subtitle-1 "
              >
                {{power.name}}
              </div>
            </div>
          </div>
        </v-card>
        <SexChip v-if="xs" :sex="candidate.sex"/>
        <AcademicTitles
          v-if="!xs"
          :candidate="candidate"
        />
      </v-col>
    </v-row>
    <v-card-text>
      <AcademicTitles
        v-if="xs"
        :candidate="candidate"
      />
      <template
        v-for="section in extra_sections"
        :key="section.key"
      >
        <div
          v-if="(section.init_display || opened_details) && candidate.professional_summary"
        >
          <div
            class="text-secondary text-subtitle-2 text-sm-subtitle-1 font-weight-bold mb-1 mt-3"
          >
            {{section.title}}
            <span
              v-if="section.subtitle"
              class="text-caption text-sm-subtitle-2"
              style="color: #9e9e9e;"
            >
              ({{section.subtitle}})
            </span>
          </div>
          <div
            class="text-white paragraph"
            :class="{'fade-out': !opened_details && section.cut_text}"
            v-html="section.text"
            :style="!opened_details && section.cut_text ? 'max-height: 80px; overflow: hidden;' : ''"
          >
          </div>
          <div class="d-flex justify-center">

            <v-btn
              v-if="section.cut_text && !opened_details"
              color="accent"
              variant="elevated"
              class="mt-n8"
              :append-icon="opened_details ? 'expand_less' : 'expand_more'"
              @click="show_details = !show_details"
              :size="xs ? 'small' : 'default'"
            >
              Ver ficha completa
            </v-btn>
          </div>
        </div>
      </template>
    </v-card-text>
    <v-card-actions class="mx-3" v-if="candidate.professional_summary && opened_details">
<!--    <v-card-actions class="mx-3" v-if="candidate.professional_summary">-->
<!--      <v-btn-->
<!--        icon-->
<!--      >-->

<!--      </v-btn>-->
      <v-spacer></v-spacer>
      <v-btn
        v-if="!opened_details"
        color="accent"
        variant="elevated"
        class="mt-n8"
        :append-icon="opened_details ? 'expand_less' : 'expand_more'"
        @click="show_details = !show_details"
        :size="xs ? 'small' : 'default'"
      >
        Ver ficha completa
      </v-btn>
      <v-btn
        v-else
        color="accent"
        variant="outlined"
        :append-icon="opened_details ? 'expand_less' : 'expand_more'"
        @click="show_details = !show_details"
        :size="xs ? 'small' : 'default'"
      >
        {{ opened_details ? 'Ocultar detalles' : 'Ver ficha completa' }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-text v-if="!candidate.professional_summary">
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
.num-lista{
  margin-top: 20px;
  position: relative;
  width: 100px;
  @media (max-width: 600px) {
    width: 80px;
  }
}

.right-circle{
  border-bottom-right-radius: 80px;
  border-top-right-radius: 80px;
  float: left;
}

.inverse-circle{
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
  @media (max-width: 600px) {
    font-size: 0.74rem;
  }
}
.power-text{
  color: white;
  font-weight: 600;
  line-height: 1rem;
  //@media (max-width: 600px) {
  //  line-height: 0.8rem;
  //}
}

.fade-out {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to bottom, rgba(43, 72, 101, 0) 0%, rgb(0, 18, 73) 100%);
    pointer-events: none;
  }
}

.rounded-circle{
  border-radius: 200px;
  //overflow: hidden;
}

</style>