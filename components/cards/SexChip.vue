<script setup>
import { useDisplay } from 'vuetify';
const { xs } = useDisplay()
const props = defineProps({
  sex: {
    type: String,
    required: true,
  },

});


</script>
<template>
  <div class="d-flex align-center mt-2 mt-md-0">
    <v-avatar
      color="white"
      :size="xs ? 30 : 36"
    >

      <v-icon
        color="primary"
        :size="xs ? 30 : 36"
      >
        {{sex === 'Hombre' ? 'male' : 'female'}}
      </v-icon>
    </v-avatar>
    <span class="ml-2 text-subtitle-1">
      {{sex}}
    </span>
  </div>
</template>
