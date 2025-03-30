<script setup>

import LicensesList from "./LicensesList.vue";

const props = defineProps({
  full_main: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <v-row>
    <v-divider></v-divider>
    <v-col cols="12">
      <div class="text-secondary text-h6 font-weight-bold mb-4">
        Texto obtenido de la IA
      </div>
      <v-textarea
        v-model="full_main.gemini_text"
        label="Info de Gémini"
        variant="outlined"
        max-rows="10"
        rows="4"
        auto-grow
      >
      </v-textarea>
    </v-col>
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
    <v-col cols="12">
      <div class="text-primary text-h5 font-weight-bold mb-4">
        Experiencia Profesional
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
          @click="$emit('generate-summary')"
          v-tooltip="`Generar resumen`"
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

  </v-row>
</template>

<style scoped lang="scss">

</style>