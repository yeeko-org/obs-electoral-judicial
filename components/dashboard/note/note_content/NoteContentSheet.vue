<script setup>

import {useMainStore} from "~/store/index.js";
const mainStore = useMainStore()

const props = defineProps({
  full_main: {
    type: Object,
    required: true,
  },
  show_details: {
    type: Boolean,
    default: false,
  },
  collection_data: Object,
})

const loading_structured = ref(false)

function getStructuredContent() {
  loading_structured.value = true
  mainStore.getAdditionalInfo(props.full_main.id).then(response => {
    console.log("response", response)
    props.full_main.structured_content = response.structured_content
    loading_structured.value = false
  })
}

</script>

<template>
  <v-card class="pa-2">
    <v-row>
      <v-col cols="6">
        <v-card-title class="title-no-wrap text-h6 font-weight-bold">
          {{full_main.title}}
        </v-card-title>
        <v-card
          variant="outlined"
          class="pt-3"
        >
          <v-card-subtitle
            v-if="full_main.subtitle"
            class="title-no-wrap font-weight-bold"
          >
            {{full_main.subtitle}}
          </v-card-subtitle>
          <v-card-text>
            <span
              v-if="full_main.content_full"
              v-html="full_main.content_full"
            >
            </span>
            <v-textarea
              v-else
              v-model="full_main.content"
              label="Contenido"
              rows="20"
              auto-grow
              variant="outlined"
            >
            </v-textarea>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">

        <v-card-title class="d-flex text-primary">
          Nota estructurada
          <v-spacer></v-spacer>
          <v-btn
            v-if="!full_main.structured_content"
            @click="getStructuredContent"
            color="accent"
            variant="elevated"
            :loading="loading_structured"
          >
            Obtener
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="full_main.structured_content"
            label="Contenido estructurado"
            rows="20"
            auto-grow
            variant="outlined"
          >
          </v-textarea>
        </v-card-text>


      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.title-no-wrap{
  white-space: normal !important;
}
</style>