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
            primary: "#3a3a3a",
            secondary: "#EE8B44",
            accent: "#5F9398",
            info: "#001249",
            warning: "#e0be79",
            hospital: "#52A198",
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
