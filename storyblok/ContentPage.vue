<script setup>
defineProps({ blok: Object })

// add name to the component

</script>

<template>
  <v-row class="page ma-0">
    <v-col cols="12">

      <StoryblokComponent
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
      ></StoryblokComponent>
    </v-col>
  </v-row>
</template>
