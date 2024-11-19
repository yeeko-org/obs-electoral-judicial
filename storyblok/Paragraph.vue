<script>
//import marked from 'marked'
import { mapState } from "vuex";
import { marked } from 'marked'
marked.setOptions({
  breaks: true,
});

export default {
  name: 'Paragraph',
  //components: { ProposalDetail },
  //props: ['blok', ],
  props: {
    blok: {
      type: Object,
      required: true,
    },
    is_nest: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState({
      user: state => state.auth.user_ocamis_details,
    }),
    explanation () {
      console.log("text", this.blok.text)
      console.log("marked", marked(this.blok.text, { breaks: true }))
      return marked(this.blok.text, { breaks: true })
    },
  },

}
</script>

<template>
  <section
    v-editable="blok"
    :class="is_nest ? '' : 'py-3 py-md-6'"
  >
    <SectionHeader
      v-if="blok.SectionHeader.length"
      :blok="blok.SectionHeader[0]"
    />
    <v-row
      _class="mx-3"
      align="center"
      :class="is_nest ? '' : 'mx-3'"
    >
      <v-col
        cols="12"
      >
        <div
          class="text-subtitle-1 font-weight-normal "
          :class="{'text-justify' : blok.justify}"
          v-html="explanation"
        ></div>
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
.special-img {
  p {
    color: blue;
  }
}
</style>
