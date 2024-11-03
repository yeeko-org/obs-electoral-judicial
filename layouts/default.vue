<script setup>

</script>

<template>
  <v-responsive max-width="1024" class="mx-auto">
    <v-app id="app-width">
        <MainNav />
        <v-main class="">
          <v-container class="px-1 px-sm-3" fluid>
            <NuxtPage />
          </v-container>
        </v-main>
        <Footer />
    </v-app>
  </v-responsive>

</template>

<style lang="scss">
@use '../assets/css/utils.scss' as *;
</style>
