<script>
export default {
  // props: ['blok'],
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed:{
    body(){
      return this.blok.body || this.blok.body2
    },
  },
}
</script>

<template>
  <v-row v-editable="blok" class="page">
    <template
      v-for="blok_c in body"
    >
      <component
        :key="blok_c._uid"
        v-if="blok_c.component"
        :blok="blok_c"
        :is="blok_c.component"
      ></component>
    </template>
  </v-row>
</template>
