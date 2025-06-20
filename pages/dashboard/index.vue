<script setup>
// import {nextTick, onBeforeMount, onMounted, ref, watch} from 'vue'

definePageMeta({
  middleware: 'dashboard',
  layout: 'dashboard',
})

// rewrite the last line in typescript
// const current_filters = ref<Array<{name: string, order: number, init_visible?: boolean, collection?: string, is_collection?: boolean, disabled?: boolean}>>([])


</script>

<template>
  <v-card class="px-3 mt-3 py-3" color="grey">
    <v-card-title>
      Elige una sección en el menú
    </v-card-title>
    <v-btn
      variant="elevated"
      color="accent"
      size="large"
      class="white-outlined"
    >Botón 1</v-btn>
    <v-btn
      variant="text"
      color="accent"
      class="_text-decoration-underline ml-2"
    >Botón 2</v-btn>
  </v-card>
</template>

<style scoped lang="scss">
.white-outlined {
  border: 3px solid white !important;
}
</style>