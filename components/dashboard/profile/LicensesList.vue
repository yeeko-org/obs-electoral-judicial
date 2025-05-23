
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useMainStore } from '~/store/index'
const mainStore = useMainStore()
const { deleteSimple } = mainStore
import axios from 'axios';


const props = defineProps({
  candidateId: {
    type: [Number, String],
    required: true
  },
  apiBaseUrl: {
    type: String,
    default: '/api/professional-licenses/'
  },
  full_main: {
    type: Object,
    required: true,
  },
});

const licenses = ref([]);
const originalLicenses = ref([]);
const editMode = ref([]);
const loading = ref(false);
const showAddForm = ref(false);
const deleted_licenses = ref([]);

const newLicense = reactive({
  level: '',
  career: '',
  year: null,
  institution: '',
  is_exact: false,
});

const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
});

const confirmDialog = reactive({
  show: false,
  licenseToDelete: null
});

// Methods

const fetchLicenses = () => {
  licenses.value = props.full_main.licenses
  originalLicenses.value = JSON.parse(JSON.stringify(licenses.value));
  editMode.value = new Array(licenses.value.length).fill(false)
};

const startEdit = (index) => {
  editMode.value = new Array(licenses.value.length).fill(false);
  editMode.value[index] = true;
  originalLicenses.value[index] = JSON.parse(
      JSON.stringify(licenses.value[index]));
};

const cancelEdit = (index) => {
  licenses.value[index] = JSON.parse(JSON.stringify(originalLicenses.value[index]));
  editMode.value[index] = false;
};

const saveLicense = async (license, index) => {
  loading.value = true;
  try {
    await axios.put(`${props.apiBaseUrl}${license.id}/`, {
      ...license,
      candidate: props.candidateId
    });
    editMode.value[index] = false;
    showNotification('Licencia actualizada con éxito', 'success');
  } catch (error) {
    showNotification('Error al actualizar: ' + error.message, 'error');
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (license) => {
  confirmDialog.licenseToDelete = license;
  confirmDialog.show = true;
};

const deleteLicense = async () => {
  if (!confirmDialog.licenseToDelete) return;

  loading.value = true;
  try {
    const pl_id = confirmDialog.licenseToDelete.id
    deleteSimple(['professional_license', pl_id]).then((res) => {
      if (res.errors) {
        showNotification('Error al eliminar: ' + res.errors, 'error');
      }
      showNotification('Licencia eliminada con éxito', 'success');
    })
    // await fetchLicenses();
  } catch (error) {
    showNotification('Error al eliminar: ' + error.message, 'error');
  } finally {
    loading.value = false;
    licenses.value = licenses.value.filter(
      (license) => license.id !== confirmDialog.licenseToDelete.id
    );
    confirmDialog.show = false;
    confirmDialog.licenseToDelete = null;
  }
};

const createLicense = async () => {
  loading.value = true;
  try {
    await axios.post(props.apiBaseUrl, {
      ...newLicense,
      candidate: props.candidateId
    });
    showNotification('Licencia creada con éxito', 'success');
    showAddForm.value = false;
    resetNewLicense();
    // await fetchLicenses();
  } catch (error) {
    showNotification('Error al crear: ' + error.message, 'error');
  } finally {
    loading.value = false;
  }
};

const cancelAdd = () => {
  showAddForm.value = false;
  resetNewLicense();
};

const resetNewLicense = () => {
  Object.assign(newLicense, {
    level: '',
    career: '',
    year: null,
    institution: '',
    is_exact: false
  });
};

const showNotification = (text, color = 'success') => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
};

// Lifecycle
onMounted(fetchLicenses);

</script>

<template>
  <v-col cols="12">

    <div class="text-primary text-h5 font-weight-bold mb-6 mt-2">
      Formación Académica
    </div>

    <!-- Licenses Table -->
    <v-sheet rounded>
      <v-row
        v-for="(license, index) in licenses"
        :key="index"
        :class="{'border-bottom': index < licenses.length - 1}"
      >
        <!-- Index Number -->
        <v-col cols="1" >
          <div class="mt-3">
            {{ license.id_licence }}
          </div>
        </v-col>

        <!-- License Fields -->
        <v-col cols="2">
          <v-text-field
            v-model="license.level"
            :readonly="!editMode[index]"
            label="Nivel"
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="license.career"
            :readonly="!editMode[index]"
            label="Profesión"
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="1">
          <div class="mt-3">
            {{license.year}}

          </div>
        </v-col>

        <v-col cols="3">
          <v-text-field
            v-model="license.institution"
            :readonly="!editMode[index]"
            label="Institución"
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>

        <!-- Exact Verification -->
        <v-col cols="1" class="d-flex align-center justify-center">
          {{license.is_exact ? 'Exacto' : 'Inexacto'}}
<!--          <v-checkbox-->
<!--            v-model="license.is_exact"-->
<!--            :readonly="!editMode[index]"-->
<!--            color="success"-->
<!--            hide-details-->
<!--          ></v-checkbox>-->
        </v-col>

        <!-- Actions -->
        <v-col cols="12" md="1" class="d-flex align-center justify-end">
          <template v-if="!editMode[index]">
<!--            <v-btn icon size="small" color="blue" class="mr-1" @click="startEdit(index)">-->
<!--              <v-icon>edit</v-icon>-->
<!--            </v-btn>-->
            <v-btn icon size="small" color="red" @click="confirmDelete(license)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              icon
              size="small"
              color="green"
              class="mr-1"
              @click="saveLicense(license, index)"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn icon size="small" color="red" @click="cancelEdit(index)">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Add New License Button -->
    <div class="text-center mb-4" v-if="false">
      <v-btn
        color="accent"
        variant="outlined"
        prepend-icon="add"
        @click="showAddForm = true"
        v-if="!showAddForm"
      >
        Agregar cédula
      </v-btn>
    </div>

    <!-- Add New License Form -->
    <v-sheet v-if="showAddForm" class="pa-4 mb-4" rounded border>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="newLicense.level"
            label="Nivel"
            variant="outlined"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="newLicense.career"
            label="Profesión"
            variant="outlined"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="2">
          <v-text-field
            v-model="newLicense.year"
            label="Año de exp."
            type="number"
            variant="outlined"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="newLicense.institution"
            label="Institución"
            variant="outlined"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="1" class="d-flex align-center justify-center">
          <v-checkbox
            v-model="newLicense.is_exact"
            color="success"
            hide-details
          ></v-checkbox>
        </v-col>

        <v-col cols="12" md="1" class="d-flex align-center justify-center">
          <v-btn icon size="small" color="success" class="mr-1" @click="createLicense">
            <v-icon>save</v-icon>
          </v-btn>
          <v-btn icon size="small" color="error" @click="cancelAdd">
            <v-icon>close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Loading Overlay -->
    <v-overlay :model-value="loading" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- Notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog.show" max-width="400">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Está seguro que desea eliminar esta licencia profesional?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="confirmDialog.show = false">Cancelar</v-btn>
          <v-btn color="red" variant="text" @click="deleteLicense">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.num-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0d6efd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>