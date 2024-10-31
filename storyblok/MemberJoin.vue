<script>

import { mask } from 'vue-the-mask'
import { mapActions } from "vuex";

export default {
  directives: { mask, },
  name: "MemberJoin",
  data() {
    return {
      org_data: {},
      org_form: false,
      mask2: '## #### ####',
      show_comment: false,
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return (pattern.test(value)) || !!this.org_data.phone || 'El correo no es válido'
        }
      },
    }
  },
  computed:{
  },
  methods: {
    ...mapActions({ saveOrg:'reports/SAVE_ORG_DATA' }),
    sendOrg(n) {
      if (this.$refs.orgForm.validate()){
        this.saveOrg(this.org_data).then((response)=>{
          this.org_data = {}
          this.$emit('close-dialog')
        })

      }
    },
  },
}
</script>

<template>
  <v-card class="mt-3" tile elevation="0">
    <v-card-title class="headline text-center mb-3 no-wrap">
      Ayúdanos a llenar los siguientes datos para poder contactarte
    </v-card-title>
    <v-form ref="orgForm" v-model="org_form" lazy-validation>
      <v-card-text>
        <v-text-field
          name="first_name"
          id="first_name"
          outlined
          label="Nombre de la organización"
          v-model="org_data.organization"
        ></v-text-field>
        <v-text-field
          name="first_name"
          id="first_name"
          outlined
          label="Nombre de la persona de contacto"
          v-model="org_data.contact_name"
        ></v-text-field>
        <v-text-field
          name="email"
          id="email"
          outlined
          label="Correo Electrónico"
          v-model="org_data.email"
          :rules="[rules.email]"
        ></v-text-field>
        <v-text-field
          name="phone"
          id="phone"
          hint="escribe los 10 dígitos"
          outlined
          v-mask="mask2"
          label="Teléfono"
          v-model="org_data.phone"
        ></v-text-field>
        <v-btn
          v-if="!show_comment"
          color="accent"
          text
          @click="show_comment = true"
        >Agregar un comentario</v-btn>
        <v-textarea
          v-else
          name="input-7-1"
          outlined
          v-model="org_data.comments"
          rows="3"
          auto-grow
          label="Explica por qué puede ser un caso de corrupción"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="advice_privacy = true"
          text
          class="px-1"
          style="margin-bottom: 1px"
        >
          Aviso de Privacidad
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          outlined
          @click="$emit('close-dialog')"
        >Cancelar</v-btn>
        <v-btn
          color="primary"
          @click="sendOrg"
          :disabled="!org_form"
        >Enviar solicitud</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
