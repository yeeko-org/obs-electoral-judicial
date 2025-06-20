<script setup>
import MainNav from "~/components/web/MainNav.vue";
import Footer from "~/components/web/Footer.vue";

const { $preview } = useNuxtApp()
const version = $preview ? 'draft' : 'published'
const story = await useAsyncStoryblok(
    'global',
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)
definePageMeta({
  layout: 'global',
})

</script>

<template>
<!--  <v-layout align-center justify-center>-->
    <MainNav
      v-for="blok in story.content.header"
      :key="blok._uid"
      :blok="blok"
      is_editable
    />
    <v-main>
      <v-container pa-0 fluid>
        <v-layout align-center justify-center >
        EDITA AQUÍ EL CONTENIDO DEL HEADER Y DEL FOOTER
        </v-layout>
      </v-container>
    </v-main>
    <Footer
      v-for="blok in story.content.footer"
      :key="blok._uid"
      :blok="blok"
      is_editable
    />
<!--  </v-layout>-->
</template>

<style scoped lang="scss">

</style>