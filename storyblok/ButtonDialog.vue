<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import MaterialList from "./MaterialList"
import DocumentList from "./DocumentList"
import FormGossip from "./FormGossip.vue";

const { xs } = useDisplay()

const props = defineProps({
  blok: Object
})

const dialog = ref(false)

function openDialog() {
  console.log('openDialog')
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

const max_width = computed(() =>
  props.blok.display_list === 'MemberJoin' ? '500px' : '850px'
)

const size = computed(() =>
  props.blok.size === 'x-large'
    ? (xs.value ? 'large' : undefined)
    : 'small'
)

const variant = computed(() =>
  props.blok.style === 'outlined'
    ? 'outlined'
    : props.blok.style === 'text'
    ? 'text'
    : 'elevated'
)

const dialog_text = computed(() => {
  let rich_text = renderRichText(props.blok.dialog_text)
  if (!rich_text)
    return '-'
  rich_text = rich_text.replace(
      /<p>/g, '<p class="mt-2 mt-sm-4">')
  return rich_text
})


</script>

<template>
  <v-btn
    :size="size"
    :variant="variant"
    :color="blok.color || 'accent'"
    class="px-5 mx-2"
    id="button_new"
    :class="blok.style ? '' : 'white--text'"
    @click="openDialog"
  >
    {{ blok.button_title }}
    <v-dialog
      v-model="dialog"
      :max-width="max_width"
      class="rounded-xl"
    >
      <v-card class="rounded-xl">
        <v-toolbar class="rounded-xl" elevation="6">
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-bold">
            {{ blok.title_dialog || 'Título' }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <MaterialList v-if="blok.display_list === 'Materials'" />
          <DocumentList v-else-if="blok.display_list === 'OfficialDocs'" />
          <FormGossip
            v-else-if="blok.display_list === 'FormGossip'"
            is_dialog
            @close-dialog="closeDialog"
          />
          <span
            v-else-if="blok.display_list === 'custom'"
            v-html="dialog_text"
            :class="`text-${blok.align_text}`"
          >

          </span>

          <span v-else>
            Ninguno?? {{ blok.display_list }}
            {{size}} {{blok.size}}
          </span>
        </v-card-text>
        <v-card-actions v-if="blok.display_list === 'custom'">
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            @click="closeDialog"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<style scoped>
</style>