<script setup>
import { onMounted, ref, nextTick } from 'vue'
import {useMainStore} from '~/store/index'
import FormGossip from "../storyblok/FormGossip.vue";
const { $preview } = useNuxtApp()
// const version_sb = process.env.NUXT_PUBLIC_STORYBLOK_VERSION
const version = $preview ? 'draft' : 'published'
const story = await useAsyncStoryblok(
    'denuncia',
    { version: version },
{ customParent: 'https://app.storyblok.com' }
)
const mainStore = useMainStore()
const { setDocuments, setGlobalConfig, fetchCatalogs, cats_ready } = mainStore
const storyblokApi = useStoryblokApi();

const success = ref(false)

useSeoMeta({
  title: 'Observatorio Electoral Judicial',
  ogTitle: 'Observatorio Electoral Judicial',
  description: 'Documentación, análisis y difusión las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025',
  ogDescription: 'Documentación, análisis y difusión las decisiones, ' +
          'los problemas y toda la información relevante del proceso electoral ' +
          'del Poder Judicial 2024-2025',
  ogType: 'website',
  ogImage: 'https://oej.yeeko.org/_nuxt/nuevo_logo.ChaL5KSF.png',
})

onMounted(() => {
  fetchCatalogs()
})

function closeDialog() {
  this.$router.push({ name: 'home' })
}

</script>

<template>
  <v-card
    v-if="!success"
    elevation="4"
    class="px-1 px-sm-4 mx-0 mx-sm-4"
  >

    <FormGossip

      @close-dialog="closeDialog"
    />
  </v-card>

</template>
