<script setup>
import CommonTitle from "../components/CommonTitle.vue";
import {storeToRefs} from "pinia";
import {useMainStore} from '~/store/index'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale('es')
const mainStore = useMainStore()
// Store setup and state
const { all_documents } = storeToRefs(mainStore)

const props = defineProps({
  blok: Object,
})


const report_blok = computed(() => {
  if (!props.blok.document)
    return null
  if (!props.blok.document.length)
    return null
  // console.log('props', props)
  // console.log('document', props.blok.document)
  // return props.blok.body.find(blok => blok.component === 'document')
  return props.blok.document[0]
})

const other_reports = computed(() => {
  // console.log('documents', all_documents.value)
  if (!report_blok.value)
    return []
  return all_documents.value.filter(doc =>
    doc._uid !== report_blok.value._uid)
  // return documents.value.body.filter(doc =>
  //   doc.type_doc !== 'Informe quincenal')
})

const header_blok = computed(() => {
  if (!report_blok.value) return null
  return {
    header: dayjs(report_blok.value.start_date).format('DD [de] MMMM [de] YYYY'),
    subheader: report_blok.value.name,
    explanation: report_blok.value.subtitle,
    // color_title: 'primary',
    // color_pleca: 'accent',
  }
})

const artificial_blok = {
  subheader: 'Otros informes',
  color_title: 'secondary',
  color_pleca: 'primary',
}

// add name to the component

function openDoc(item) {
  if (!item.file_doc) return
  window.open(item.file_doc.filename, '_blank')
}

</script>

<template>
  <v-row class="page ma-0">
    <v-col cols="12">
      <SectionHeader
        v-if="report_blok"
        :blok="header_blok"
        :report_blok="report_blok"
        v-editable="report_blok"
      />
      <StoryblokComponent
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
        :report_blok="report_blok"
      ></StoryblokComponent>
      <v-card
        v-for="blok in blok.document"
        class="pb-2 pb-md-4 mt-3 pt-3"
        elevation="6"
      >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            variant="elevated"
            class="mr-2"
            @click="openDoc(blok)"
            append-icon="file_download"
          >
            Descargar Reporte
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card
        v-if="report_blok"
        class="pb-2 pb-md-4 mt-3 pt-3"
        elevation="6"
      >

        <CommonTitle
          :blok="artificial_blok"
        />
        <DocumentList
          :init_documents="other_reports"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
