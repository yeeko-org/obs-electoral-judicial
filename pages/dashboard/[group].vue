<script setup>

import ProfileHolder from "../../components/dashboard/profile/ProfileHolder.vue";
import CollectionDisplay from "../../components/dashboard/CollectionDisplay.vue";

definePageMeta({
  middleware: 'dashboard',
  layout: 'dashboard',
})
</script>

<template>
<!--  <ProfileHolder />-->
  <CollectionDisplay />

</template>

<style scoped lang="scss">

</style>