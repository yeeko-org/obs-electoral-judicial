<script setup>
import { computed } from 'vue'

const props = defineProps({
  blok: Object
})

const explanation = computed(() => {
  let rich_text = renderRichText(props.blok.text)
  return rich_text
})

const nestedContent = computed(() =>
  props.blok.nested_content.map(cont => ({
    ...cont,
    explanation: renderRichText(cont.text)
  }))
)
</script>

<template>
  <v-card
    v-editable="blok"
    variant="text"
    style="min-width: 100%;"
    _class="py-3 py-md-6 pa-2 pa-sm-4"
    :class="blok.free_class"
  >
    <v-sheet
      outlined class="mb-3" v-if="blok.title || explanation"
    >
      <v-card-title
        class="text-h3 text-primary"
      >
        {{ blok.title }}
      </v-card-title>
      <v-card-text
        v-html="explanation"
        class="text-black text-body-1"
      ></v-card-text>
    </v-sheet>
    <v-expansion-panels
      variant="accordion"
      bg-color="transparent"
    >
      <v-expansion-panel
        v-for="item in nestedContent"
        :key="item._uid"
        v-editable="item"
        elevation="0"
      >
        <v-expansion-panel-title
          class="text-subtitle-2 text-sm-h6 text-accent font-weight-bold px-2 montse"
        >
          {{ item.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text class="mx-n2">
          <v-card-text
            v-html="item.explanation"
            class="text-black text-body-1 px-0 montse"
            style="white-space: pre-line;"
          ></v-card-text>
          <StoryblokComponent
            v-for="nest_cont in item.nested_content"
            :key="nest_cont._uid"
            :blok="nest_cont"
          ></StoryblokComponent>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<style lang="scss" scoped></style>
