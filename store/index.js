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
    all_documents: [],
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
    setAllDocuments(stories) {
      console.log('setting all documents', stories)
      this.all_documents = stories.reduce((acc, story) => {
        // console.log('story', story)
        if (story.content.document.length > 0){
          let doc = story.content.document[0]
          doc.slug = story.slug
          doc.full_slug = story.full_slug
          acc.push(doc)
        }
        return acc
      }, [])
      // console.log('all_documents', this.all_documents)
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



