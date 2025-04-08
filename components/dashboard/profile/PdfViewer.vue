<script setup>

const props = defineProps({
  item_url: {
    type: String,
    required: true,
  },
})

const show_img = ref(false)

</script>

<template>
  <v-chip
    v-if="!show_img"
    large
    class="ml-6 px-6 my-1"
    color="accent lighten-1"
    close-icon="delete"
    text-color="red"
    @click="show_img = !show_img"
    prepend-icon="picture_as_pdf"
  >
    <span class="white--text">
      {{item_url.split('/').pop()}}
    </span>
  </v-chip>
  <div
    v-else
    class="resizable-container ml-6 my-1"
  >
    <embed
      type="application/pdf"
      :src="item_url"
      class="_ml-6 _my-1 resizable-pdf"
    />
  </div>
</template>

<style scoped>
.resizable-container{
  border: 1px solid black;
  width: 890px;
  height: 640px;
  overflow: auto;
  resize: both;
  max-width: 1020px;
}
.resizable-content{
  object-fit: contain;
}
.resizable-pdf{
  width: 100%;
  height: 98%;
}
</style>
