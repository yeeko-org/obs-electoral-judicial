<script setup >

const props = defineProps({
  full_main: {
    type: Object,
    required: true,
  },
  is_massive_edit: Boolean,
  is_edit: Boolean,
})

const rules = ref({
  required: value => !!value || "Campo requerido",
})

</script>

<template>
  <v-col cols="12" class="d-flex pa-0" v-if="!full_main.id">
    <v-text-field
      v-model="full_main.subtitle"
      label="Subtítulo"
      class="mr-2"
      variant="outlined"
      style="width: 300px;"
    >
    </v-text-field>
  </v-col>
  <v-textarea
    v-if="!full_main.id"
    v-model="full_main.content"
    label="Contenido de la nota"
    rows="20"
    auto-grow
    variant="outlined"
    :rules="[rules.required]"
  >
  </v-textarea>
</template>

<style scoped>

</style>