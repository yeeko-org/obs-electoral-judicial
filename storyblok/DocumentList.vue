<script>

import { mapState } from "vuex";
import componentMixin from "~/mixins/componentMixin";
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import * as d3 from 'd3';
dayjs.locale('es')

export default {
  name: "DocumentList",
  mixins: [componentMixin],
  props: ['blok'],
  data(){
    return {
      curr_idx: undefined,
      expanded_idxs: [],
      selected_years: [],
      selected_docs: [],
      type_documents: {
        "Informe": ["#dabdff", "#c192ff", "purple"],
        "Comunicado": ["#feaabc", "#fd7291", "pink"],
      },
    }
  },
  computed:{
    ...mapState({
      documents: state => state.content.documents || {body:[]},
    }),
    final_docs(){
      let final_docs = this.blok ? this.blok.body : this.documents.body
      final_docs = final_docs.map(doc=>{
        doc.color_back = doc.type_doc === 'Informe'
          ? ["#dabdff", "#c192ff"]
          : ["#feaabc", "#fd7291"]
          // ["#dedede", "#c6c6c6"]
        doc.colors = this.type_documents[doc.type_doc]
        let date_created = `${doc.created.substr(0, 10)}`
        date_created = dayjs(date_created)
        doc.created_date = date_created
        doc.year = date_created.year()
        doc.created_format = date_created.format("D [de] MMMM [de] YYYY")
        return doc
      })
      final_docs = final_docs.sort((x, y)=>
         d3.descending(x.created_date, y.created_date))
      return final_docs
    },
    all_years(){
      return this.final_docs.reduce((arr, doc)=>
        !arr.includes(doc.year) ? [...arr, doc.year] : arr
      ,[])
    },
    filtered_docs(){
      let selected_years = this.selected_years.length
        ? this.all_years.filter((year, idx)=> this.selected_years.includes(idx))
        : this.all_years
      let selected_docs = this.selected_docs.length
        ? this.all_types.filter((doc, idx)=> this.selected_docs.includes(idx))
        : this.all_types
      return this.final_docs.filter(doc=>
        selected_docs.some(sel_doc=> sel_doc.name == doc.type_doc )
        && selected_years.some(sel_year=> sel_year == doc.year)
      )
    },
    all_types(){
      let all_types = this.final_docs.reduce((arr, doc)=>
        !arr.includes(doc.type_doc) ? [...arr, doc.type_doc] : arr
      ,[])
      return all_types.map((type, idx)=>
        ({name: type, colors: this.type_documents[type]}))
    },
  },
}
</script>

<template>
  <div class="pt-2">
    <div class="d-flex align-center">
      <span class="mr-2 text-subtitle-1">Filtrar años:</span>
      <v-chip-group multiple v-model="selected_years">
        <v-chip
          v-for="year in all_years"
          :key="year"
          class="mx-1"
          filter
          outlined
          color="accent"
        >
          {{year}}
        </v-chip>
      </v-chip-group>
      <span class="mr-2 text-subtitle-1 ml-4">Filtrar documentos:</span>
      <v-chip-group multiple v-model="selected_docs">
        <v-chip
          v-for="type_doc in all_types"
          :key="type_doc._uid"
          class="mx-1"
          filter
          outlined
          :color="type_doc.colors[2]"
        >
          {{type_doc.name}}
        </v-chip>
      </v-chip-group>
    </div>
    <v-card
      v-for="(item, idx) in filtered_docs"
      :key="item._uid"
      v-editable="item"
      class="my-6 pb-0 rounded-lg"
      :color="item.colors[0]"
    >
      <v-row justify="center" align="center">
        <v-col
          _cols="12"
          _sm="5"
          _md="4"
          cols="auto"
          class="pl-3 pa-0 text-center shrink"
          _align="stretch"
          align-self="stretch"
          style="height: 100%;"
          height="320"
        >
          <v-card
            :color="item.colors[1]"
            class="rounded-lg"
            style="height: 100%"
          >
            <v-img
              _style="max-height: 200px; max-width: 200px;"
              dark
              :aspect-ratio="1"
              _src="/background7.webp"
              :src="resizedImg(item.cover, 180)"
              __style="height: 100%;"
              _min-height="'100%'"
              min-width="180"
              :max-height="'100%'"
              _max-width="250"
              id="header"
            ></v-img>
          </v-card>
        </v-col>
        <v-col
          _cols="12"
          _sm="7"
          _md="8"
          class="pa-1 pa-sm-2 pa-md-3 grow"
        >
          <v-card-subtitle class="text-subtitle-1 no-wrap pb-0 black--text">
            <span :class="`${item.colors[2]}--text`">
              {{item.type_doc}}
            </span>
            |
            <span class="grey--text text--darken-1">
              {{item.created_format}}
            </span>
          </v-card-subtitle>
          <v-card-title class="text-h5 no-wrap pt-2 font-weight-bold">
            {{item.name}}
          </v-card-title>
        </v-col>
        <v-col
          _cols="12"
          _sm="7"
          _md="8"
          class="mx-4 mt-8 pa-1 pa-sm-2 pa-md-3 shrink"
        >
          <v-btn
            rounded
            outlined
            color="blak"
            large
            :href="item.file_doc ? item.file_doc.filename : ''"
            target="_blank"
          >
            <v-icon class="mr-2">fa-file-download</v-icon>
            Descargar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
