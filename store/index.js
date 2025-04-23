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
  "pk": 'id',
  "status_groups": [
    "status_register",
    "status_validation",
  ],
  "fields": [
    {
      "name": "id",
      "null": false,
      "width": 80,
      "is_string": false,
      "real_name": "id",
      "field_type": "integer",
      "is_massive": false,
      "is_editable": true,
      "primary_key": true,
      "verbose_name": "ID",
      "relation_type": "simple"
    },
    {
      "name": "status_register",
      "null": true,
      "width": 100,
      "is_string": false,
      "real_name": "status_register_id",
      "field_type": "unknown",
      "is_massive": false,
      "is_editable": true,
      "primary_key": false,
      "related_name": "note",
      "verbose_name": "status register",
      "related_model": "StatusControl",
      "relation_type": "relation",
      "related_app_label": "oej",
      "related_snake_name": "status_control"
    },
    {
      "name": "status_validation",
      "null": true,
      "width": 100,
      "is_string": false,
      "real_name": "status_validation_id",
      "field_type": "unknown",
      "is_massive": false,
      "is_editable": true,
      "primary_key": false,
      "related_name": "note",
      "verbose_name": "status validation",
      "related_model": "StatusControl",
      "relation_type": "relation",
      "related_app_label": "oej",
      "related_snake_name": "status_control"
    },
    {
      "name": "comments",
      "null": true,
      "width": 200,
      "is_string": true,
      "real_name": "comments",
      "field_type": "text",
      "is_massive": false,
      "is_editable": true,
      "primary_key": false,
      "verbose_name": "comments",
      "relation_type": "simple"
    }
  ],
  "is_category": false,
  "level": "primary",
  "available_actions": [],
  "child_relation_fields": [],
  "has" : {
    "order": false,
    "comments": true,
  },
  "collection_filters": [
      {
          "title": "Puesto", "field": "position",
          "component": "PositionFilter", "hidden": false,
          "order": 10, "is_custom": true
      },
      {
          "title": "Registra", "field": "user_register",
          "component": "UserSelect", "hidden": false,
          "order": 11, "is_custom": true
      },
      {
          "title": "Valida", "field": "user_validation",
          "component": "UserSelect", "hidden": false,
          "order": 12, "is_custom": true
      },
      {
          "title": "Solo mis perfiles", "field": "own_profiles",
          "component": "SimpleSwitch", "hidden": false,
          "order": 12, "is_custom": true
      },
  ],
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
    if (obj[st.group])
      obj[st.group].push(st)
    else
      obj[st.group] = [st]
    return obj
  }, {})
}


function getLastId(data) {
  if (data.elems_ids){
    return { method: 'patch', last_id: `${data.elems_ids[0]}/massive_patch/` }
  }
    // return { method: 'post', last_id: 'massive_edit/' }
  const id = data.id || data.key_name
  // const id = data.id
  const is_old = data.id && !data.is_new
  const method = is_old ? 'put' : 'post'
  const last_id = is_old ? `${id}/` : ''
  return { method, last_id }
}

function calculateSeats(data) {

  const positions = data.position.reduce((acc, pos) => {
    pos.body_full = data.body.find((b) => b.id === pos.body)
    acc[pos.id] = pos
    return acc
  }, {})
  return data.seat.reduce((acc, seat) => {
    seat.position_full = positions[seat.position]
    seat.body_full = seat.position_full.body_full
    acc[seat.id] = seat
    return acc
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
    cats: [],
    status: {},
    seats: {},
    schemas: {
      "collections_dict": {
        "candidate": schema,
      },
      collections: [schema]
    }
  }),
  actions: {
    setHeader() {
      const cookie_auth = useCookie('auth_oej')
      if (cookie_auth.value) {
        ApiService.defaults.headers.common['Authorization'] = `Token ${cookie_auth.value}`
      }
    },
    fetchCatalogs() {
      this.setHeader()
      return new Promise((resolve) => {
        ApiService.get('/catalogs/all/')
          .then(({data}) => {
            console.log("fetchCatalogs data", data)
            this.cats = data
            this.seats = calculateSeats(data)
            // this.schemas = calculateSchemas(data)
            // console.log("schemas", this.schemas)
            // this.all_nodes = calculateNewCats(data, this.schemas)
            if (data.status_control){
              this.status = calculate_status(data.status_control)
              this.cats_ready = true
            }
            // this.setCollectionData()
            // this.setFilterGroupData()
            console.log("fetchCatalogs end")
            resolve(data)
          })
          .catch(error => {
            console.error(error)
          })
      })
    },
    cancelFetch() {
      if (request)
        request.cancel("Operation canceled by the user.")
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
    async saveSimple([collection, data]) {
      this.setHeader()
      const { method, last_id } = getLastId(data)
      try {
        let response = await ApiService[method](`/${collection}/${last_id}`, data);
        return response.data
      } catch (error) {
        console.error(error);
        return {errors: error.response.data}
      }
    },
    async patchSimple([collection, id, data]) {
      this.setHeader()
      try {
        let response = await ApiService.patch(`/${collection}/${id}/`, data);
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
    async deleteSimple([group, id]) {
      this.setHeader()
      try {
        await ApiService.delete(`/${group}/${id}/`);
        return {success: true}
      } catch (error) {
        console.error(error);
        return {errors: error.response.data}
      }
    },
    async getSummary([candidate_id, data]) {
      try {
        let response = await ApiService.post(
          `/candidate/${candidate_id}/generate_summary/`, data);
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
    status_dict(state) {
      if (!state.cats.status_control)
        return {}
      let status_dict = {}
      Object.keys(state.status).forEach(group_key=>{
        status_dict[group_key] = {}
        state.status[group_key].forEach(st=>{
          status_dict[group_key][st.name] = st
        })
      })
      return status_dict
    },
    positions_dict(state) {
      if (!state.cats.position)
        return {}
      return state.cats.position.reduce((acc, pos) => {
        pos.body_full = state.cats.body.find((b) => b.id === pos.body)
        acc[pos.id] = pos
        return acc
      }, {})
    },
    all_users(state) {
      if (!state.cats)
        return []
      return state.cats.user
    },
    users_dict(state) {
      if (!state.cats.user)
        return {}
      return state.cats.user.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {})
    },
    circunscriptions(state) {
      if (!state.cats.circunscription)
        return []
      return state.cats.circunscription.map((c) => {
        c.states = state.cats.state.filter((s) => s.circunscription === c.id)
        let code_names = c.states.map((s) => {
          let name = s.code_name
          name = name.toUpperCase()
          name = name.replace(/\./g, '')
          return name
        })
        console.log('code_names', code_names)
        c.states_text = code_names.join(', ')
        return c
      })
    },
  }
})



