<script setup>

import PanelCommon from "~/components/dashboard/common/PanelCommon.vue";

import {ref, computed, shallowRef, nextTick, defineEmits} from 'vue'

const props = defineProps({
  results: Array,
  collection_data: Object,
  sel: Object,
  show_details: {
    type: Boolean,
    default: false,
  },
  parent: String,
  is_simple: Boolean,
  main_action: String,
})

const open_panels = ref([])
const main_show_details = ref(false)

const header_component = shallowRef('')
const sheet_component = shallowRef('')

const emits = defineEmits(['select-item'])

const route_key = computed(() => props.collection_data.app_label)
const snake_name = computed(() => props.collection_data.snake_name)
const header_name = computed(() => `${props.collection_data.model_name}Header`)
const sheet_name = computed(() => `${props.collection_data.model_name}Sheet`)

import(`~/components/dashboard/${route_key.value}/${snake_name.value}/${header_name.value}.vue`)
  .then(module => {
    header_component.value = module.default
  })
  .catch(e => {
    import(`~/components/dashboard/generic/HeaderGeneric.vue`).then(module => {
      header_component.value = module.default
    })
  })

import(`~/components/dashboard/${route_key.value}/${snake_name.value}/${sheet_name.value}.vue`)
  .then(module => {
    sheet_component.value = module.default
  })
  .catch(e => {
    import(`~/components/dashboard/generic/SheetCommon.vue`).then(module => {
      sheet_component.value = module.default
    })
  })

function addItem({res, is_new}) {
  console.log("addItem", res, is_new)
  const elem_id = res.id ? 'id' : 'key_name'
  if (is_new)
    props.results.unshift(res)
  else {
    const index = props.results.findIndex(result => result[elem_id] === res[elem_id])
    props.results[index] = res
  }
}

function deleteItem(elem_id) {
  // console.log("deleteItem", res)
  open_panels.value = []
  const index = props.results.findIndex(
      result => result[props.collection_data.pk] === elem_id)
  props.results.splice(index, 1)
}

function changeShowDetails() {
  nextTick(() => {
    setTimeout(() => {
      main_show_details.value = true
    }, 10)
  })
}

const elem_id = computed(() => props.collection_data.pk)

// function saveItem() {
//   emits('save-item')
// }

</script>

<template>
  <v-expansion-panels
    multiple
    v-model="open_panels"
  >
    <PanelCommon
      v-for="elem in results"
      :key="elem[elem_id]"
      :collection_data="collection_data"
      :main="elem"
      :sel="sel"
      :main_action="main_action"
      @finish-open="changeShowDetails"
      @item-saved="addItem"
      @item-deleted="deleteItem"
      @select-item="emits('select-item', $event)"
    >
      <template
        #header="{openMain}"
        v-if="header_component"
      >
        <component
          :is="header_component"
          :main="elem"
          :collection_data="collection_data"
          :show_details="show_details"
          @open-panel="openMain"
          :parent="parent"
          :is_simple="is_simple"
        />
      </template>
      <template
        #sheet="{full_main}"
        v-if="sheet_component"
      >
        <component
          :is="sheet_component"
          :full_main="full_main"
          :show_details="main_show_details"
          :collection_data="collection_data"
        />
      </template>
    </PanelCommon>
  </v-expansion-panels>
</template>

<style scoped>

</style>