<script>

export default {
  name: 'PageReport',
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      informer_type: '',
      want_add: false,
    }
  },
  computed:{
    body(){
      return this.blok.body || this.blok.body2
    },
    dialog_report:{
      get(){
        return this.want_add
      },
      set(val){
        this.want_add = false
      },
    },
  },
  watch:{
    informer_type(type_rep){
      if (type_rep){
        this.want_add = true
        this.$ga.event({
          eventCategory: 'click',
          eventAction: 'select_profile',
        })
      }
      else
        this.dialog_report = false
    }
  },
  methods: {
    goToForm(offs=30){
      this.$vuetify.goTo('#save_form',
        {duration: 400, offset: 30, easing:'easeInOutCubic'})
    },
    finishedReport(state_id){
      this.informer_type = ''
      this.dialog_report = false
      this.goToForm(100)
      if (!state_id) return
      setTimeout(() => {
        this.$vuetify.goTo('#MapCard',
          {duration: 600, offset: 30, easing:'easeInOutCubic'})
        this.$refs.map.colocatePin(state_id)
      }, 1200)
    },
    changeInformer(inf_type){
      this.informer_type = inf_type
    }
  },
}
</script>

<template>
  <v-row v-editable="blok" class="page ma-0">
    <template
      v-for="blok_c in body"
    >
      <StoryblokComponent
        :key="blok_c._uid"
        v-if="blok_c.component"
        :blok="blok_c"
        @change-informer="changeInformer($event)"
      ></StoryblokComponent>
    </template>
  </v-row>
</template>
