<script setup>

// import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { xs, mdAndUp, smAndDown } = useDisplay()

const props = defineProps({
  is_editable: Boolean,
})

//       logo: null, // require("@/assets/logo.png"),
// const logo = ref(null)
// const menu = ref(false)
// const font_size = computed(() => xs.value ? 12 : 14)

</script>

<template>
  <v-app-bar
    color="primary"
    height="90"
  >
    <div
      class="app-width2 d-flex align-center px-3"
    >
      <router-link to="/" class="d-flex align-center">
        <v-img
          src="~/assets/nuevo_logo.png"
          :height="xs ? 64 : 76"
          :width="xs ? 64 : 76"
        />
        <v-img
          class="ml-3"
          src="~/assets/letras.png"
          :height="xs ? 60 : 70"
          :width="xs ? 190 : 220"
        />
      </router-link>
      </div>
  </v-app-bar>
</template>

<style lang="scss">
  .header-xs{
    margin-left: -10px
  }
</style>
