<script>

import { mapState } from "vuex";
import componentMixin from "~/mixins/componentMixin"
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import * as d3 from 'd3';
dayjs.locale('es')

export default {
  name: "MaterialList",
  mixins: [componentMixin],
  props: ['blok'],
  data(){
    return {
      curr_idx: undefined,
      expanded_idxs: [],
      selected_mats: [],
      type_materials: {
        "para Redes Sociales": ["#dabdff", "#c192ff", "purple"],
        "Audiovisual": ["#feaabc", "#fd7291", "pink"],
        "para Impresión": ["#dedede", "#c6c6c6", "grey"],
      },
    }
  },
  computed:{
    ...mapState({
      materials: state => state.content.materials || {body:[]},
    }),
    final_mats(){
      let final_mats = this.blok ? this.blok.body : this.materials.body
      final_mats = final_mats.map(mat=>{
        let date_created = `${mat.created.substr(0, 10)}`
        date_created = dayjs(date_created)
        mat.created_date = date_created
        mat.year = date_created.year()
        mat.colors = this.type_materials[mat.type_material]
        return mat
      })
      final_mats = final_mats.sort((x, y)=>
         d3.descending(x.created_date, y.created_date))
      return final_mats
    },
    all_types(){
      let all_types = this.final_mats.reduce((arr, mat)=>
        !arr.includes(mat.type_material) ? [...arr, mat.type_material] : arr
      ,[])
      return all_types.map((type, idx)=>
        ({name: type, colors: this.type_materials[type]}))
    },
    filtered_mats(){
      if (!this.selected_mats.length)
        return this.final_mats
      let selected_mats = this.all_types.filter((mat, idx)=>
        this.selected_mats.includes(idx))
      return this.final_mats.filter(mat=>
        selected_mats.some(sel_mat=> sel_mat.name == mat.type_material))
    },
  },
}
</script>

<template>
  <div class="pt-2">
    <div class="d-flex align-center">
      <span class="mr-2 text-subtitle-1">Filtrar materiales:</span>
      <v-chip-group multiple v-model="selected_mats">
        <v-chip
          v-for="type_mat in all_types"
          :key="type_mat.name"
          class="mx-1"
          filter
          outlined
          :color="type_mat.colors[2]"
        >
          {{type_mat.name}}
        </v-chip>
      </v-chip-group>
    </div>
    <v-card
      v-for="item in filtered_mats"
      :key="item._uid"
      v-editable="item"
      class="my-6 pb-0 rounded-lg"
      :color="item.colors[0]"
    >
      <v-row justify="center" align="center">
        <v-col
          cols="auto"
          class="pl-3 pa-0 text-center shrink d-flex justify-center"
          align="center"
          justify="center"
          align-self="stretch"
          style="height: 100%;"
          height="320"
        >
          <v-card
            :color="item.colors[1]"
            class="rounded-lg"
          >
            <v-img
              _style="max-height: 200px; max-width: 200px;"
              dark
              :aspect-ratio="0.95"
              _src="/background7.webp"
              :src="resizedImg(item.cover, 200)"
              __style="height: 100%;"
              _min-height="'100%'"
              min-width="200"
              :max-height="'100%'"
              _max-width="250"
              id="header"
            ></v-img>
          </v-card>
        </v-col>
        <v-col
          class="pa-1 pa-sm-2 pa-md-3 grow"
        >
          <v-card-subtitle class="text-subtitle-1 no-wrap pb-0 black--text pt-2">
            <span :class="`${item.colors[2]}--text`">
              Material {{item.type_material}}
            </span>
            |
            <span class="grey--text text--darken-1">
              {{item.year}}
            </span>
          </v-card-subtitle>
          <v-card-title class="text-h5 no-wrap py-2 font-weight-bold">
            {{item.name}}
          </v-card-title>
          <v-card-text v-if="item.description" class="black--text text-body-1 pb-2">
            {{item.description}}
          </v-card-text>
        </v-col>
        <v-col
          class="mx-4 mt-8 pa-1 pa-sm-2 pa-md-3 shrink d-flex flex-column align-center"
        >
          <v-btn
            v-if="item.file_material.filename"
            rounded
            outlined
            color="blak"
            large
            :href="item.file_material ? item.file_material.filename : ''"
            target="_blank"
            class="my-2"
            block
          >
            <v-icon class="mr-2">fa-file-download</v-icon>
            Descargar
          </v-btn>
          <v-btn
            v-if="item.link.url"
            rounded
            outlined
            color="blak"
            large
            block
            :href="item.file_material ? item.file_material.filename : ''"
            target="_blank"
            class="my-2"
          >
            <v-icon class="mr-2">fa-external-link-alt</v-icon>
            Visitar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
