<script setup>

import LicensesList from "./LicensesList.vue";
</script>

<template>
  <v-card style="width: 100%" class="ma-3 pa-3" elevation="5">
    <v-card-text>

      <v-row>
        <LicensesList :candidate-id="3" />
        <v-divider></v-divider>
        <v-col cols="12">
          <div class="text-primary text-h5 font-weight-bold mb-4">
            Experiencia Profesional
          </div>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Info de Gémini"
            variant="outlined"
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">

</style>