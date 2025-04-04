<script setup>

const props = defineProps({
  sources: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    default: 'Fuentes consultadas:',
  },
  show_other_sources: {
    type: Boolean,
    default: false
  },
  has_other_sources: {
    type: Boolean,
    default: false
  },
})

const final_sources = computed(() => {
  return Object.values(props.sources)
})

</script>
<template>
  <v-col
    cols="12"
    v-if="final_sources.length"
    class="d-flex flex-wrap"
  >
    <div class="text-info text-subtitle-1 font-weight-bold mr-2">
      {{ title }}
    </div>
    <v-chip
      v-for="source in final_sources"
      :key="source.number"
      class="mr-2 mb-2"
      color="indigo-lighten-2"
      variant="tonal"
      size="small"
      :href="source.href"
      target="_blank"
    >
      <template v-slot:prepend>
        <v-avatar
            size="x-small"
            color="indigo-lighten-3"
            class="mr-1"
        >
          {{source.number}}
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-icon
            class="ml-1"
            color="indigo"
        >
          open_in_new
        </v-icon>
      </template>
      {{ source.text }}...
    </v-chip>
    <v-btn
      v-if="show_other_sources && !has_other_sources"
      size="small"
      variant="outlined"
      color="indigo"
      @click="$emit('add-source')"
    >
      Agregar más fuentes
    </v-btn>
  </v-col>
</template>
