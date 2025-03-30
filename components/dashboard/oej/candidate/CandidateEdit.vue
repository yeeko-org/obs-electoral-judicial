<script setup>
import ProfileHolder from "../../profile/ProfileHolder.vue";

const props = defineProps({
  is_edit: Boolean,
  is_massive_edit: Boolean,
  full_main: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <ProfileHolder
    :full_main="full_main"
  />

</template>

<style scoped>

</style>