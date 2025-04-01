<script setup>
import CardHolder from "../../cards/CardHolder.vue";

const props = defineProps({
  position: Object,
  init_candidates: Array,
})

const sexes = ['Mujer', 'Hombre']

const filtered_candidates = computed(() => {
  return props.init_candidates.filter((candidate, idx) => {
    return candidate.position === props.position.id
  })
})

const candidates_by_sex = computed(()=>{
  return sexes.map(sex=>{
    return {
      sex: sex,
      candidates: filtered_candidates.value.filter(cand => cand.sex === sex)
    }
  })
})

</script>

<template>
  <v-card
    :color="position.color_light"
    tile
    class="pa-3"
  >
    <v-row
      class="mx-0"
    >
<!--      <v-col-->
<!--        cols="12"-->
<!--        md="6"-->
<!--        v-for="candidate in filtered_candidates"-->
<!--        :key="candidate.id"-->
<!--      >-->
<!--        <CardHolder-->
<!--          :candidate="candidate"-->
<!--        />-->
<!--      </v-col>-->
      <v-col
        cols="12"
        md="6"
        v-for="sex in candidates_by_sex"
        :key="sex.sex"
      >
        <CardHolder
          v-for="candidate in sex.candidates"
          :candidate="candidate"
          class="my-3"
        />
      </v-col>

    </v-row>

    {{ position }}
  </v-card>

</template>

<style scoped lang="scss">

</style>