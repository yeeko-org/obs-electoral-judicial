<script setup>
import {useMainStore} from "~/store/index.js";
import LicensesList from "./LicensesList.vue";
import CardHolder from "../../cards/CardHolder.vue";
import Sources from "./Sources.vue";
import PdfViewer from "./PdfViewer.vue";

const mainStore = useMainStore()
const { seats } = storeToRefs(mainStore)
const { getSummary } = mainStore

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
    icon: 'summarize',
    field: 'gemini_text',
    text_error: 'Aún no se ha generado su información desde la IA',
    cols: 4,
    btn_text: 'Desplegar',
  },
  {
    title: 'Biografía del CJF',
    icon: 'gavel',
    field: 'biography_full',
    text_error: 'No se encontró su biografía en el sitio del CJF',
    cols: 3,
    btn_text: 'Desplegar',
  },
  {
    title: 'Conóceles',
    icon: 'widgets',
    field: 'id_ine',
    text_error: 'No tiene data',
    cols: 3,
    btn_text: 'Desplegar',
  },
  {
    title: 'Ficha',
    icon: 'contacts',
    field: 'id',
    text_error: 'No se encontró su biografía en el sitio del CJF',
    cols: 2,
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
  } else if (card.field === 'id_ine') {
    full_text.value = props.full_main.ine_cv_text
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

const summary_label = computed(() => {
  return props.full_main.professional_summary
    ? 'Intenta separarlo en 2 párrafos'
    : 'Generar automáticamente con el botón de arriba'
})

const sources_dict = computed(() => {
  if (!props.full_main.sources)
    return {}
  return props.full_main.sources.reduce((acc, source, idx) => {
    acc[idx + 1] =  {
      number: idx + 1,
      href: source,
      text: source.replace(/^(https?:\/\/)?(www\.)?/, '').substring(0, 30),
    }
    return acc
  }, {})
})

const more_info_ia = computed(() => {
  if (!props.full_main.more_info_ia)
    return 'No generada aún'
  // Replace the [number] with the corresponding source text
  let final_text = props.full_main.more_info_ia
  const attrs = `target="_blank" class="ml-1"`
  let final_sources = {}
  final_text = final_text.replace(/\[(\d+)\]/g, (match, number) => {
    const source = sources_dict.value[number]
    if (source){
      final_sources[source.number] = source
      const url = source.href
      const num = source.number
      return `<a href="${url}" v-tooltip:bottom="${url}" ${attrs}>[${num}]</a>`
    }
    return match
  })
  return {
    html: final_text,
    sources: final_sources
  }

})

const ine_url = computed(() => {
  if (!props.full_main.id_ine)
    return null
  const candidature_type = props.full_main.ine_data?.idTipoCandidatura
  if (!candidature_type)
    return null
  const base = 'https://candidaturaspoderjudicial.ine.mx/detalleCandidato'
  return `${base}/${props.full_main.id_ine}/${candidature_type}`
})

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
        <v-card-text
          class="py-1 d-flex align-center justify-space-around"
        >
          <v-icon
            size="40"
            color="blue"
          >{{ card.icon }}</v-icon>
          <div class="flex-grow-1 d-flex flex-column align-center">
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
        </v-card-text>
      </v-card>
    </v-col>
    <Sources
      :sources="sources_dict"
      v-if="full_main.sources"
      :has_other_sources="Boolean(full_main.other_sources)"
      show_other_sources
      @add-source="full_main.other_sources = ' '"
    />
    <v-textarea
      v-if="full_main.other_sources"
      v-model="full_main.other_sources"
      label="Otras fuentes (sepáralas con una coma)"
      variant="outlined"
      rows="1"
      auto-grow
      clearable
    ></v-textarea>


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
        HALLAZGOS - Conflictos de interés y otros detalles.
      </div>
      <v-card
        v-if="full_main.more_info_ia"
        class="pa-3 text-body-1 mb-4"
        variant="tonal"
        color="blue"
        style="min-height: 30px;"
      >
        <div class="text-blue-accent-2 text-subtitle-1 font-weight-bold mb-3">
          Texto original de hallazgos (solo para referencias)
        </div>
        <span
          style="white-space: pre-line;"
          v-html="more_info_ia.html"
        ></span>
        <Sources
          title="Fuentes:"
          :sources="more_info_ia.sources"
          class="pb-0 px-0"
        />

      </v-card>
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
        :label="summary_label"
        variant="outlined"
        max-rows="20"
        rows="4"
        auto-grow
      >
      </v-textarea>
    </v-col>
    <v-col cols="12" v-if="full_main.attention_notes_ia">
      <div class="text-error-accent-2 text-subtitle-1 font-weight-bold mb-4">
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
      <div class="text-blue-accent-2 text-subtitle-1 font-weight-bold mb-4">
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
      :max-width="card_selected?.is_preview ? '100%' : '1000px'"
    >
      <v-card
        v-if="field_selected"
        class="py-6"
        :color="card_selected?.is_preview ? seat_full.position_full.color_light : null"
      >
        <v-card-title class="d-flex pl-6 pt-0 align-center">
          <div class="text-h5 font-weight-bold">

            {{card_selected.title}}
          </div>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="accent"
            variant="text"
            @click="dialog_text = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text
          v-if="full_text"
          class="text-black text-body-1"
        >
          <v-btn
            v-if="card_selected.field === 'id_ine' && ine_url"
            :href="ine_url"
            target="_blank"
            variant="outlined"
            color="accent"
            append-icon="open_in_new"
          >
            Ir a su perfil en el INE
          </v-btn>
          <PdfViewer
            v-if="card_selected.field === 'id_ine'"
            :item_url="full_main.ine_cv"
          />
          <div
            v-html="full_text"
            style="white-space: pre-line;"
          >

          </div>
          <v-divider
            class="my-4"
            color="blue-grey darken-1"
            thickness="2"
            opacity="0.6"
          ></v-divider>
          <Sources
            v-if="card_selected.field === 'gemini_text'"
            :sources="sources_dict"
          />
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
            variant="outlined"
          >Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped lang="scss">
.source-ref{
  margin-left: 4px;
}
</style>