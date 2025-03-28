<script setup>
import {computed, onMounted, ref, watch} from 'vue'

const menu_drawer = ref(false)
import {useAuthStore} from "~/store/auth.js";

const authStore = useAuthStore()
// const { fetchCatalogs } = mainStore
const { logout } = authStore
// const route = useRoute()

onBeforeMount(() => {
  console.log("cats_ready")
//   fetchCatalogs().then(() => {
//     console.log("cats_ready")
//   })
})

const collection_data = computed(() => {
  // console.log('route', route)
  // const group_name = route.params.group
  const dashboard = {
    title: 'Dashboard',
    name: 'Dashboard',
    plural_name: 'Dashboard',
    icon: 'dashboard',
    key: 'dashboard',
  }
  return dashboard
  // return all_groups.value.find(g => g.key === group_name) || dashboard
  // return current_collection_data.value || dashboard
})

</script>

<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      flat
      class="mt-n1"
      clipped-left
      height="48"
    >
      <v-app-bar-nav-icon
        @click.stop="menu_drawer = !menu_drawer"
        color="white"
        class="mt-1"
      ></v-app-bar-nav-icon>
      <client-only>
        <v-toolbar-title class="d-flex align-center mt-1">
          <v-icon class="mr-3" color="white">
            {{ collection_data.icon || (collection_data.parent ? collection_data.parent.icon : 'dashboard') }}
          </v-icon>
          <span class="text-white">
            {{ collection_data.plural_name }}
          </span>
          <v-btn
            v-if="false"
            icon="category"
            _v-tooltip:bottom="'Categorías de ___'"
          ></v-btn>
        </v-toolbar-title>
      </client-only>
      <v-spacer></v-spacer>
      <v-btn
        @click="logout"
        color="white"
        light
        outlined
        icon="logout"
        v-tooltip:bottom="'Cerrar sesión'"
      >
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container
        _style="width: 100%;"
        class="pt-0"
        fluid
      >
        <v-layout align-center justify-center >
          <client-only>
            <NuxtPage/>
          </client-only>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
