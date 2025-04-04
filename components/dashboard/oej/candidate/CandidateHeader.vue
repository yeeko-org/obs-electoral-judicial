<script setup>

import HeaderCommon from "~/components/dashboard/generic/HeaderCommon.vue";

import {useMainStore} from '~/store/index.js'
import {storeToRefs} from "pinia";
const mainStore = useMainStore()

const { users_dict } = storeToRefs(mainStore)

const props = defineProps({
  main: Object,
  mentions: Array,
  collection_data: Object,
  show_details: {
    type: Boolean,
    default: false,
  },
  parent: String,
})

const default_user = {
  color: 'grey',
  initials: '??',
  organization: 'Sin definir'
}

const stages = [
  {
    name: 'Registro',
    field: 'user_register',
  },
  {
    name: 'Validación',
    field: 'user_validation',
  },
]

const users_by_stages = computed(() => {
  return stages.reduce((arr, stage) => {
    const user = users_dict.value[props.main[stage.field]]
    if (user) {
      arr.push({
        ...user,
        stage: stage.name,
      })
    }
    return arr
  }, [])
})
// const emits = defineEmits(['open-panel'])


</script>

<template>
  <HeaderCommon
    :main="main"
    :show_details="show_details"
    :collection_data="collection_data"
  >
    <template v-slot:title>

      <span class="text-subtitle-1 font-weight-bold ml-2">

        {{ main.full_name }}
      </span>
    </template>
    <template v-slot:icon>
<!--      <v-avatar-->
<!--        v-if="user_validation"-->
<!--        :color="user_validation.color"-->
<!--        size="32"-->
<!--      >-->
<!--        {{ user_validation.initials }}-->
<!--        <v-tooltip-->
<!--          bottom-->
<!--          :open-on-hover="true"-->
<!--          :location="'end'"-->
<!--          :activator="'parent'"-->
<!--        >-->
<!--          <div>-->
<!--            Validación:-->
<!--          </div>-->
<!--          <div>-->

<!--            {{ user_validation.full_name }}-->
<!--          </div>-->
<!--          ({{ user_validation.organization }})-->
<!--        </v-tooltip>-->
<!--      </v-avatar>-->
      <v-avatar
        v-for="user in users_by_stages"
        :key="user.id"
        :color="user.color"
        size="32"
        class="ml-1"
      >
        {{ user.initials }}
        <v-tooltip
          bottom
          :open-on-hover="true"
          :location="'end'"
          :activator="'parent'"
        >
          <div>
            {{ user.stage }}:
          </div>
          <div>
            {{ user.full_name }} ({{ user.organization }})
          </div>

        </v-tooltip>
      </v-avatar>
    </template>
    <template v-slot:details>
      <template
        v-if="main.biography"
      >
        <v-icon
          color="green"
          class="ml-3"
          size="x-large"
        >
          contacts
        </v-icon>
        <span
          class="text-green text-subtitle-1 font-weight-bold ml-1"
        >
          Bio
        </span>
      </template>
      <span
        v-else
      ></span>

    </template>
  </HeaderCommon>
</template>

<style scoped>

</style>