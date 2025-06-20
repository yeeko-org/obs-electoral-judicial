<script setup>

import StatusDetail from "~/components/dashboard/status/StatusDetail.vue";
import Comments from "~/components/dashboard/common/Comments.vue";
import {storeToRefs} from "pinia";
import {useMainStore} from "~/store/index.js";
import {saveElement} from "~/composables/save_elements.js";
// import {saveElement} from "~/composables/save_elements.js";
const mainStore = useMainStore()
const { schemas } = storeToRefs(mainStore)

const props = defineProps({
  full_main: Object,
  collection_data: Object,
  collection_name: String,
})

const saving = ref(false)
const snackbar = ref(false)
const editForm = ref(null)
const emits = defineEmits(['new-item'])
const errors = ref(null)

const final_collection_data = computed(() => {
  if (props.collection_data)
    return props.collection_data
  return schemas.value.collections_dict[props.collection_name]
})

async function saveRecord() {
  errors.value = null
  const { valid } = await editForm.value.validate()
  // emits('save-item', props.full_main)
  if (!valid) return
  saving.value = true
  const elem_id = props.full_main.id ? 'id' : 'key_name'
  // console.log('props.full_main', props.full_main)
  const is_new = !Boolean(props.full_main[elem_id])
  saveElement(final_collection_data.value, props.full_main).then((res) => {
    if (res.errors) {
      errors.value = res.errors
      saving.value = false
      return
    }
    emits('item-saved', {res, is_new})
    snackbar.value = true
    saving.value = false
  })
}

</script>

<template>
  <v-card class="mb-3 pa-3" elevation="8">
    <v-alert
      v-if="errors"
      type="error"
      dismissible
      border="left"
      elevation="2"
      class="mb-3"
    >
      {{ errors }}
    </v-alert>
    <v-form
      ref="editForm"
    >
      <v-card-text
        class="d-flex flex-wrap"
      >
        <v-col cols="12" class="d-flex pa-0">
          <v-text-field
            v-if="final_collection_data.has.order"
            v-model="full_main.order"
            label="Orden"
            type="number"
            variant="outlined"
            class="mr-2"
            style="max-width: 70px;"
          >
          </v-text-field>
          <v-text-field
            v-if="final_collection_data.name_field"
            v-model="full_main[final_collection_data.name_field]"
            :label="final_collection_data.name_field"
            class="mr-2"
            variant="outlined"
            style="width: 300px;"
          />
          <v-spacer></v-spacer>
          <template v-if="final_collection_data.status_groups">
            <StatusDetail
              v-for="status_group in final_collection_data.status_groups"
              :final_filters="full_main"
              :collection="status_group"
              style="max-width: 300px;"
              density="default"
              class="mr-1"
            />
          </template>
          <Comments
            v-if="final_collection_data.has.comments"
            :main="full_main"
            :final_collection_data="final_collection_data"
          />
        </v-col>
        <v-col
          v-if="final_collection_data.has.icon || final_collection_data.has.color"
          cols="12"
          class="d-flex pa-0"
        >
          <v-text-field
            v-if="final_collection_data.has.icon"
            v-model="full_main.icon"
            label="Ícono (material icons)"
            variant="outlined"
            class="mx-2"
            style="max-width: 200px;"
          >
            <template v-slot:append>
              <v-btn
                icon
                href="https://fonts.google.com/icons"
                target="_blank"
              >
                <v-icon>open_in_new</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
            v-if="final_collection_data.has.color"
            v-model="full_main.color"
            label="Color"
            variant="outlined"
            class="mx-2"
            style="max-width: 200px;"
          >
            <template v-slot:append>
              <v-btn
                icon
                href="https://vuetifyjs.com/en/styles/colors/#material-colors"
                target="_blank"
              >
                <v-icon>open_in_new</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>

        <slot name="edit" :full_main="full_main">
          EDICIÓN (REVISAR PORQUE NO ES NORMAL)
        </slot>
        <v-col
          v-if="final_collection_data.has.description"
          cols="12"
          class="d-flex pa-0"
        >
          <v-textarea
            v-model="full_main.description"
            label="Descripción"
            rows="1"
            auto-grow
            class="mr-2"
            variant="outlined"
          ></v-textarea>
        </v-col>
        <v-col
          cols="12"
          class="d-flex pa-0"
        >
          <v-textarea
            v-if="final_collection_data.has.help_text"
            v-model="full_main.help_text"
            label="Texto de ayuda"
            variant="outlined"
            rows="2"
            auto-grow
            _hide-details
          >
          </v-textarea>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="accent"
          :id="`save_${final_collection_data.snake_name}-${
            full_main.id || full_main.key_name || 'new'
          }`"
          variant="elevated"
          :loading="saving"
          @click="saveRecord"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      color="success"
      location="right top"
      location-strategy="connected"
    >
      Se ha guardado el registro
      <template v-slot:actions>
        <v-btn
          color="accent"
          variant="text"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<style scoped>

</style>