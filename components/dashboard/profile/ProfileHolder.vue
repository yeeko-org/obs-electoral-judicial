<script setup>
import {useMainStore} from "~/store/index.js";
const mainStore = useMainStore()
const { seats } = storeToRefs(mainStore)
const { getSummary } = mainStore

import LicensesList from "./LicensesList.vue";
import CardHolder from "../../cards/CardHolder.vue";

const props = defineProps({
  full_main: {
    type: Object,
    required: true,
  },
})

const dialog_text = ref(false)
const field_selected = ref('')
const full_text = ref('')
const card_selected = ref(undefined)
const want_edit_text = ref(false)
const loading_summary = ref(false)

const seat_full = computed(() => {
  return seats.value[props.full_main.seat] || {}
})

const cards = [
  {
    title: 'Texto obtenido de la IA',
    icon: 'contacts',
    field: 'gemini_text',
    text_error: 'Aún no se ha generado su información desde la IA',
    cols: 5,
    btn_text: 'Desplegar',
  },
  {
    title: 'Biografía del CJF',
    icon: 'contacts',
    field: 'biography_full',
    text_error: 'No se encontró su biografía en el sitio del CJF',
    cols: 4,
    btn_text: 'Desplegar',
  },
  {
    title: 'Ficha (previsualización)',
    icon: 'contacts',
    field: 'id',
    text_error: 'No se encontró su biografía en el sitio del CJF',
    cols: 3,
    btn_text: 'Ver',
    is_preview: true,
  },
]

const openDialog = (card) => {
  field_selected.value = card.field
  card_selected.value = card
  if (card.field === 'biography_full') {
    full_text.value = props.full_main.biography_full.curriculum
  } else if (card.field === 'gemini_text') {
    full_text.value = props.full_main.gemini_text
  }
  else if (card.field === 'id') {
    full_text.value = null
  }
  dialog_text.value = true
}

const generateSummary = () => {
  loading_summary.value = true
  getSummary([props.full_main.id, props.full_main]).then(response => {
    props.full_main.professional_summary = response
    loading_summary.value = false
  })
}

</script>

<template>
  <v-row>
    <v-divider
      thickness="3"
      opacity="0.7"
      color="accent"
    ></v-divider>
    <v-col
      v-for="card in cards"
      :key="card.field"
      :cols="card.cols"
      class="mb-4"
    >
      <v-card
        color="blue"
        class="mb-4 py-3"
        variant="tonal"
      >
        <v-card-title
          class="py-1 d-flex align-center"
        >
          <v-icon
            size="40"
            color="blue"
          >{{ card.icon }}</v-icon>
          <div>
            <div class="ml-4 font-weight-bold text-subtitle-1">
              {{ card.title }}
            </div>
            <v-btn
              v-if="full_main[card.field]"
              color="accent"
              class="ml-4"
              outlined
              @click="openDialog(card)"
            >
              {{ card.btn_text }}
            </v-btn>
            <div class="ml-4 text-orange text-caption" v-else>
              {{ card.text_error }}
            </div>
          </div>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      v-if="full_main.sources && full_main.sources.length"
      class="d-flex flex-wrap"
    >
      <div class="text-info text-subtitle-1 font-weight-bold mr-2">
        Fuentes consultadas:
      </div>
      <v-chip
        v-for="(source, idx) in full_main.sources"
        :key="source"
        class="mr-2 mb-2"
        color="indigo-lighten-2"
        variant="tonal"
        size="small"
        :href="source"
        target="_blank"
      >
        <template v-slot:prepend>
          <v-avatar
            size="x-small"
            color="indigo-lighten-3"
            class="mr-1"
          >
            {{idx + 1}}
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-icon
            class="ml-1"
            color="indigo"
          >
            open_in_new
          </v-icon>
        </template>
<!--        Remove https:// and http://-->
        {{ source.replace(/^(https?:\/\/)?(www\.)?/, '').substring(0, 30) }}...
      </v-chip>
    </v-col>
    <v-divider
      thickness="3"
      opacity="0.7"
      color="accent"
    ></v-divider>
    <LicensesList
      v-if="full_main.licenses"
      :candidate-id="full_main.id"
      :full_main="full_main"
    />
    <v-col cols="12">
      <div class="text-primary text-subtitle-1 font-weight-bold mb-4">
        Títulos según la IA
      </div>
      <v-card
        class="d-flex align-center pa-3 text-body-1"
        variant="tonal"
        color="blue"
        style="min-height: 30px;"
      >

        <span
          style="white-space: pre-line;"
          v-html="full_main.academic_ia"
        ></span>

      </v-card>

    </v-col>
    <v-col cols="12" class="d-flex">
      <div class="text-secondary text-h6 font-weight-bold mt-4">
        Año de inicio
      </div>
      <v-text-field
        v-model="full_main.first_year"
        label="Año de inicio"
        class="ml-4"
        variant="outlined"
        type="number"
        min="1900"
        max="2100"
        max-width="200px"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <div class="text-secondary text-h6 font-weight-bold mb-4">
        Complemento de experiencia académica
      </div>
      <v-textarea
        v-model="full_main.academic_text"
        label="Texto complementario de la experiencia académica"
        variant="outlined"
        max-rows="20"
        rows="4"
        auto-grow
      >
      </v-textarea>
    </v-col>
    <v-divider
      thickness="3"
      opacity="0.7"
      color="accent"
    ></v-divider>
    <v-col cols="12">
      <div class="text-primary text-h5 font-weight-bold mb-4 mt-2">
        Experiencia Profesional y otros detalles
      </div>
    </v-col>
    <v-col cols="12">
      <div class="text-secondary text-h6 font-weight-bold mb-4">
        Detalles de la experiencia profesional
      </div>
      <v-textarea
        v-model="full_main.professional_text"
        label="Texto completo de la experiencia profesional"
        variant="outlined"
        max-rows="20"
        rows="4"
        auto-grow
      >
      </v-textarea>
    </v-col>
    <v-col cols="12">
      <div class="text-secondary text-h6 font-weight-bold mb-4">
        Otros detalles como conflictos de interés y otros hallazgos
      </div>
      <v-textarea
        v-model="full_main.more_info_text"
        label="Revisa todos los detalles y elimina interpretaciones"
        variant="outlined"
        max-rows="20"
        rows="4"
        auto-grow
      >
      </v-textarea>
    </v-col>
    <v-col cols="12">
      <div class="text-secondary text-h6 font-weight-bold mb-4 d-flex">
        <div>
          Resumen (para ficha compacta)
          </div>
        <v-btn
          class="ml-4"
          color="accent"
          :variant="full_main.professional_summary ? 'text' : 'elevated'"
          @click="generateSummary"
          v-tooltip="`Generar resumen vía IA`"
          :loading="loading_summary"
        >
          Generar resumen
        </v-btn>
      </div>
      <v-textarea
        v-model="full_main.professional_summary"
        label="Generar automáticamente con el botón de arriba"
        variant="outlined"
        max-rows="20"
        rows="4"
        auto-grow
      >
      </v-textarea>
    </v-col>
    <v-col cols="12" v-if="full_main.attention_notes_ia">
      <div class="text-primary text-subtitle-1 font-weight-bold mb-4">
        Posibles errores identificados
      </div>
      <v-card
        class="d-flex align-center pa-3 text-body-1"
        variant="tonal"
        color="error"
        style="min-height: 30px;"
      >
        <span
          style="white-space: pre-line;"
          v-html="full_main.attention_notes_ia"
        ></span>
      </v-card>
    </v-col>
    <v-col cols="12">
      <div class="text-primary text-subtitle-1 font-weight-bold mb-4">
        Interpretaciones de la IA (no público)
      </div>
      <v-card
        class="d-flex align-center pa-3 text-body-1"
        variant="tonal"
        color="blue"
        style="min-height: 30px;"
      >
        <span
          style="white-space: pre-line;"
          v-html="full_main.judgments"
        ></span>
      </v-card>
    </v-col>
    <v-dialog
      v-model="dialog_text"
      :max-width="card_selected?.is_preview ? '100%' : '900px'"
    >
      <v-card
        v-if="field_selected"
        class="py-6"
        :color="card_selected?.is_preview ? seat_full.position_full.color : null"
      >
        <v-card-title>
          {{card_selected.title}}
        </v-card-title>
        <v-card-text
          v-if="full_text"
          class="text-black text-body-1"
          style="white-space: pre-line;"
          v-html="full_text"
        >
        </v-card-text>
        <v-row
          v-else
          class="mx-0"
        >
          <v-col cols="12" md="6">

            <CardHolder
              :candidate="full_main"
            />
          </v-col>

        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="want_edit_text"
            @click="dialog_text = false; want_edit_text=false"
            color="success"
          >Guardar</v-btn>
          <v-btn
            v-else
            @click="dialog_text = false"
            color="accent"
            outlined
          >Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped lang="scss">

</style>