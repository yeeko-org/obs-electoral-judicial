import { defineStore } from 'pinia'
import ApiService from "./common";
// import { mande } from 'mande'
import * as d3 from 'd3';
import axios from 'axios';
let request = axios.CancelToken.source();

const schema = {
  "name": "Candidato",
  "plural_name": "Candidatos",
  "app_label": "oej",
  "snake_name": "candidate",
  "model_name": "Candidate",
  "pk": 1,
  "fields": [],
  "is_category": false,
  "level": "primary",
  "available_actions": [],
  "child_relation_fields": [],
  "has" : {
    "order": false,
  },
  "available_sorts": [
    {
      "title": "Más recientes",
      "value": "-id"
    },
    {
      "title": "Más antiguos",
      "value": "id"
    }
  ],
}

const calculate_status = (status_control) => {
  return status_control.reduce((obj, st) => {
    // st = colorMixin.methods.getComplementColor(st)
    // if (obj[st.group])
    //   obj[st.group].push(st)
    // else
    //   obj[st.group] = [st]
    return obj
  }, {})
}

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    institutions: [],
    materials: [],
    documents: [],
    all_documents: [],
    global_config: null,
    cats_ready: false,
    status: {},
    schemas: {
      "collections_dict": {
        "candidate": schema,
      },
      collections: [schema]
    }
  }),
  actions: {
    setHeader() {
      const cookie_auth = useCookie('auth_ocsa')
      if (cookie_auth.value) {
        ApiService.defaults.headers.common['Authorization'] = `Token ${cookie_auth.value}`
      }
    },
    fetchCatalogs() {
      console.log("fetchCatalogs init")
      return new Promise((resolve) => {
        ApiService.get('/catalogs/all/')
          .then(({data}) => {
            // console.log("fetchCatalogs data", data)
            this.cats = data
            // this.schemas = calculateSchemas(data)
            // console.log("schemas", this.schemas)
            // this.all_nodes = calculateNewCats(data, this.schemas)
            this.status = calculate_status(data.status_control)
            // this.setCollectionData()
            // this.setFilterGroupData()
            this.cats_ready = true
            console.log("fetchCatalogs end")
            resolve(data)
          })
          .catch(error => {
            console.error(error)
          })
      })
    },
    async fetchElements([group, params]) {
      return new Promise(resolve => {
        this.setHeader()
        ApiService.get(`/${group}/`, {
          cancelToken: request.token, params: params })
          .then(({ data }) => {
            return resolve(data)
          })
          .catch(thrown => {
            if (axios.isCancel(thrown)) {
              request = null
              request = axios.CancelToken.source()
              return resolve({ cancelled: true })
            } else {
              console.error(thrown)
            }
          })
      })
    },
    async getSimple([group, id]) {
      this.setHeader()
      try {
        let response = await ApiService.get(`/${group}/${id}/`);
        return response.data
      } catch (error) {
        console.error(error)
        ;
      }
    },
    async sendResponse(data) {
      try {
        let response = await ApiService.post(`/oej/response/`, data);
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
    async saveFile([response_id, file_data]) {
      try {
        console.log('response_id', response_id)
        let response = await ApiService.post(
          `/oej/response/${response_id}/add_file/`, file_data,
          {headers: {
            'Content-Type': 'multipart/form-data'
          }});
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
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
      let documents = stories.reduce((acc, story) => {
        // console.log('story', story)
        if (story.content.document.length > 0){
          let doc = story.content.document[0]
          doc.slug = story.slug
          doc.full_slug = story.full_slug
          acc.push(doc)
        }
        return acc
      }, [])
      documents = documents.sort((a, b) => d3.descending(a.date_start, b.date_start))
      this.all_documents = documents
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
    },
  }
})



