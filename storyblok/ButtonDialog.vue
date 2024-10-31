<script>
import InstitutionsList from "./InstitutionsList"
import MaterialList from "./MaterialList"
import DocumentList from "./DocumentList"
import MemberJoin from "./MemberJoin"

export default {
  name: 'ButtonDialog',
  components: { InstitutionsList, MaterialList, DocumentList, MemberJoin },
  props: ['blok'],
  data(){
    return {
      dialog: false,
    }
  },
  methods:{
    openDialog(){
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },
  },
  computed: {
    max_width(){
      return this.blok.display_list == 'MemberJoin'
        ? '500px'
        : '850px'
    },
  }
}
</script>

<template>

  <v-btn
    :x-large="$breakpoint.is.smAndUp && blok.size == 'x-large'"
    :large="($breakpoint.is.xs && blok.size == 'x-large') || blok.size == 'large'"
    :small="blok.size == 'x-large'"
    :outlined="blok.style == 'outlined'"
    :text="blok.style == 'text'"
    :color="blok.color || 'black'"
    class="px-5 mx-2"
    id="button_new"
    :class="blok.style ? '' : 'white--text'"
    @click="openDialog"
    rounded
  >
    {{blok.button_title}}
    <v-dialog
      v-model="dialog"
      :max-width="max_width"
      class="rounded-xl"
    >
      <v-card class="rounded-xl">
        <v-toolbar class="rounded-xl" elevation="6">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-bold">
            {{blok.title_dialog || 'Título'}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title v-if="false">
          Recientes
        </v-card-title>
        <v-card-text>
          <InstitutionsList v-if="blok.display_list === 'AllianceList'"/>
          <MaterialList v-else-if="blok.display_list === 'Materials'"/>
          <DocumentList v-else-if="blok.display_list === 'OfficialDocs'"/>
          <MemberJoin
            v-else-if="blok.display_list === 'MemberJoin'"
            @close-dialog="closeDialog"
          />
          <span v-else>Ninguno: {{blok.display_list}}</span>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>

</template>
