// import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            // primary: colors.indigo.darken1,
            // secondary: '#424242',
            // accent: colors.teal.accent4,
            primary: "#ff002f",
            secondary: "#d7a997",
            accent: "#1e1e1e",
          }
        }
      }
    },
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md,
      }
    }
  })
  app.vueApp.use(vuetify)
})
