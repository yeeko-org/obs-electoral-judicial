import { defineStore } from 'pinia'
import ApiService from "./common";
// import { mande } from 'mande'
import * as d3 from 'd3';


export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    institutions: [],
    materials: [],
    documents: [],
    global_config: null,
  }),
  actions: {
    setInstitutions(institutions) {
      this.institutions = institutions.body.sort((a, b) => d3.ascending(a.name, b.name))
    },
    setMaterials(materials) {
      this.materials = materials;
    },
    setDocuments(documents) {
      console.log('setting documents', documents)
      this.documents = documents
    },
    setGlobalConfig(config) {
      console.log('setting footer config', config)
      this.global_config = config
    }
  },
  getters: {
    getCounter() {
      return this.counter
    }
  }
})



