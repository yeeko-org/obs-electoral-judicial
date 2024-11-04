<script setup>

</script>

<template>

    <v-app >
      <MainNav />
      <v-responsive max-width="1024" class="mx-auto">
      <v-main class="" id="app-width">
        <v-container class="px-1 px-sm-3" fluid>
          <NuxtPage />
        </v-container>
      </v-main>
      </v-responsive>
      <Footer />
    </v-app>
</template>

<style lang="scss">
@use '../assets/css/utils.scss' as *;
</style>
