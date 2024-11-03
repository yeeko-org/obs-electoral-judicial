<script setup>
defineProps({ blok: Object })

// add name to the component

</script>

<template>
  <DocumentList
    :blok="blok"
  />
<!--  <v-row class="ma-0">-->
<!--    soy yo mismo {{blok.body}}-->
<!--    <StoryblokComponent-->
<!--      v-for="blok in blok.body"-->
<!--      :key="blok._uid"-->
<!--      :blok="blok"-->
<!--    ></StoryblokComponent>-->
<!--  </v-row>-->
</template>
