<script>

import { mapState } from "vuex";
//import marked from 'marked'
import componentMixin from "~/mixins/componentMixin"
import * as d3 from 'd3';

export default {
  name: "InstitutionsList",
  mixins: [componentMixin],
  props: ['blok'],
  data(){
    return {
      curr_idx: undefined,
      curr_state: undefined,
      show_orphans: false,
      search_text: "",
      selected_tab: "Integrantes",
      expanded_idxs: [],
      represent_tabs: ["Integrantes", "Documentos", "Noticias"],
      all_states: [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Coahuila",
        "Colima",
        "Chiapas",
        "Chihuahua",
        "Ciudad de México",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "México",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas"
      ],
    }
  },
  computed:{
    ...mapState({
      institutions: state => state.content.institutions || [],
    }),
    all_institutions(){
      //console.log(this.institutions)
      let instits = this.blok ? this.blok.body : this.institutions
      instits = instits.map(instit=>{
        if (instit.web_page.url){
          const has_http = instit.web_page.url.includes('http')
          if (has_http){
            instit.final_link = instit.web_page.url
            const link_splited = instit.web_page.url.split("//")
            instit.public_link = link_splited[1]
          }
          else{
            instit.final_link =  `https://${instit.web_page.url}`
            instit.public_link = instit.web_page.url
          }
        }
        instit.standard_name = this.toStandard(instit.name)
        return instit
      })
      return instits
    },
    show_alerts(){
      return this.$route.name === 'instits'
    },
    filtered_institutions(){
      let final_institutions = []
      if (!this.search_text)
        final_institutions = this.all_institutions
      const standard_search = this.toStandard(this.search_text)
      final_institutions = this.all_institutions.filter(instit=>
        instit.standard_name.includes(standard_search))
      final_institutions = final_institutions.map(instit=>{
        if (!instit.logo.filename){
          instit.too_small = false
          instit.height = 0
          instit.large_text = false
          return instit
        }
        let prev_string = instit.logo.filename.substr(33,12)
        let both_sizes = prev_string.split("x")
        both_sizes[1] = both_sizes[1].replace(/\/.*$/g, '')
        let width = Number(both_sizes[0])
        let height = Number(both_sizes[1])
        instit.too_small = width < 180 && height < 113
        instit.height = height / width * 180
        instit.large_text = instit.name.length > 48
        return instit
      })
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.stack){
            console.log(this.$refs.stack)
            this.$refs.stack.reflow()
          }
        }, 200)
      })
      return final_institutions
    },
    curr_state_institutions(){
      return this.all_institutions.filter(instit=>
        this.curr_state === instit.state)
    },
    orphan_states(){
      return this.all_states.filter(state=>
        !this.representations.includes(state))
    },
    representations(){
      return this.all_institutions.reduce((arr, instit)=>
        instit.state && !arr.includes(instit.state)
          ? [...arr, instit.state]
          : arr
      ,[])
    },
  },
  methods:{
    toStandard(str){
      return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    },
  }
}
</script>

<template>
  <v-row class="pb-3 mt-3" v-if="curr_state">
    <v-col cols="12" class="d-flex align-center">
      <v-btn
        icon
        color="accent"
        large
        class="mr-4"
        @click="curr_state = undefined"
      >
        <v-icon large>fa-arrow-left</v-icon>
      </v-btn>
      <v-select
        :items="representations"
        v-model="curr_state"
        label="Representación estatal"
        clearable
        hide-details
        outlined
        large
        style="max-width: 400px;"
      ></v-select>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-tabs
          v-model="selected_tab"
          fixed-tabs
          background-color="primary lighten-1"
          color="white"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="tab in represent_tabs"
            :key="tab"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="selected_tab">
          <v-tab-item
            v-for="tab in represent_tabs"
            :key="tab"
          >
            <v-col
              v-for="(instit, idx) in curr_state_institutions"
              :key="instit._uid"
              cols="12"
            >
              <v-card
                v-editable="instit"
                class="py-3"
                outlined
              >
                <v-row justify="center" align="stretch">
                  <v-col
                    class="pa-1 pa-sm-2 pa-md-3 grow pr-0 d-flex flex-column justify-center"
                  >
                    <v-card-title class="text-h4 no-wrap py-0">
                      <v-col
                        v-if="instit.is_spokesman"
                        cols="12"
                        class="pa-0"
                      >
                        <v-chip color="primary" v-if="false">Vocero estatal</v-chip>
                        <span class="primary--text text-overline font-weight-bold">
                          Vocero estatal
                        </span>
                      </v-col>
                      {{instit.name}}
                    </v-card-title>
                    <v-card-text v-if="instit.web_page.url" class="pb-0">
                      <b class="mr-2 grey--text">Página web:</b>
                      <a :href="instit.final_link" target="_blank">
                        {{instit.public_link}}
                      </a>
                    </v-card-text>
                  </v-col>
                  <v-col
                    cols="auto"
                    class="py-3 px-0 text-center"
                    align="middle"
                    align-self="center"
                    height="280"
                    width="288"
                  >
                    <v-img
                      v-if="instit.logo"
                      :src="resizedImg(instit.logo, 0, 180)"
                      _style="max-height: 100px;"
                      max-height="140"
                      min-width="288"
                      class="mr-3"
                      contain
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="pb-3 mt-3" v-else>
    <v-col cols="12">
      <v-card-title class="black--text pa-0">
        Representaciones estatales:
      </v-card-title>
    </v-col>
    <v-col cols="12">
      <v-chip
        v-for="repr in representations"
        :key="repr"
        color="accent"
        outlined
        class="mr-2"
        @click="curr_state = repr"
      >{{repr}}</v-chip>
      <v-btn text color="accent" @click="show_orphans = !show_orphans">
        Ver {{show_orphans ? 'menos' : 'más'}}
        <v-icon class="ml-2">
          fa-angle-{{show_orphans ? 'up' : 'down'}}
        </v-icon>
      </v-btn>
    </v-col>
    <v-row v-if="show_orphans">
      <v-col cols="12">
        <v-card-title primary-title>
          Entidades que aún no cuentan con representación estatal:
        </v-card-title>
      </v-col>
      <v-col
        v-for="state in orphan_states"
        :key="state"
        cols="6"
        class="pb-3 pt-0"
      >
        <v-card color="grey lighten-3">
          <v-card-title>
            <span class="text-h6 black--text">{{state}}</span>
            <v-spacer></v-spacer>
            <v-btn outlined color="accent">Unirme</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-divider class="mb-4" color="blue"></v-divider>
      <v-card-title class="black--text pa-0">
        Colectivos integrantes ({{all_institutions.length}})
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search_text"
          style="max-width: 340px;"
          outlined
          label="Filtrar colectivos"
          append-icon="fa-search"
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>
    </v-col>
    <v-col
      _v-for="(instit, idx) in filtered_institutions"
      cols="12"
      _sm="6"
    >
      <Stack
        ref="stack"
        :column-min-width="380"
        :gutter-width="8"
        :gutter-height="8"
      >
        <StackItem
          v-for="(instit, idx) in filtered_institutions"
          :key="instit._uid"
        >
      <v-card
        v-editable="instit"
        class="py-1 py-sm-2 py-md-3"
        outlined
      >
        <v-row align="center">
          <v-col
            :cols="instit.large_text ? 12 : null"
            class="grow pr-0 d-flex flex-column justify-center"
          >
            <v-card-title class="text-h6 no-wrap py-0">
              {{instit.name}}
            </v-card-title>
            <v-divider class="mr-6 ml-3"></v-divider>
            <v-card-text
              v-if="instit.web_page.url && !instit.large_text"
              class="pb-0 pt-2"
            >
              <a
                :href="instit.final_link"
                target="_blank"
                class="font-weight-bold"
              >
                Visitar sitio web
              </a>
            </v-card-text>
          </v-col>
          <v-col
            v-if="instit.large_text"
            cols="6"
            class="pl-8"
          >
            <a
              :href="instit.final_link"
              target="_blank"
              class="font-weight-bold"
            >
              Visitar sitio web
            </a>
          </v-col>
          <v-col
            :cols="instit.large_text ? 6 : 'auto'"
            class="pa-2 text-center shrink"
            align="middle"
            align-self="center"
            style="width: 160px;"
            height="240"
            width="160"
          >
            <v-alert
              v-if="show_alerts && instit.too_small"
              type="warning"
            >
              Imagen chica
            </v-alert>
            <v-img
              v-if="instit.logo"
              :src="resizedImg(instit.logo, 0, 180)"
              _style="max-height: 100px;"
              max-height="100"
              max-width="160"
              :height="instit.height"
              class="mr-3"
              contain
            ></v-img>
          </v-col>
        </v-row>
      </v-card>
        </StackItem>
      </Stack>

    </v-col>
  </v-row>
</template>
