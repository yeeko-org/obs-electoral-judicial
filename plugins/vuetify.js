// import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDateInput } from "vuetify/labs/VDateInput"
import { VBtn } from 'vuetify/components/VBtn'
// import colors from 'vuetify/lib/util/colors'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VDateInput
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#C41D7F",
            primaryDark: "#9B055D",
            secondary: "#1E1E1E",
            ibero: "#E00034",
            accent: "#CF0622",
            pinky: "#c72d67",
            pinked: "#f6b6bd",
            choco: "#3A0811",
          }
        }
      }
    },
    aliases: {
      VBtnPrimary: VBtn,
      VBtnText: VBtn,
      VBtnMenu: VBtn,
    },
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md,
      }
    },
    defaults: {
      VBtnPrimary: {
        class: ['v-btn--primary', 'text-none', 'rounded-xl', 'px-6'],
        // prependIcon: 'arrow_back',
        appendIcon: 'arrow_forward',
      },
      VBtnText: {
        class: ['v-btn--text', 'rounded-xl', 'px-6'],
        // prependIcon: 'arrow_back',
        appendIcon: 'arrow_forward',
      },
      VBtnMenu: {
        class: ['v-btn--menu', 'text-none'],
      },
    },
    date: {
      locale: {
        'es-MX': {
          firstDayOfWeek: 0,
          masks: {
              input: 'DD/MM/YYYY',
              date: 'DD/MM/YYYY',
              time: 'HH:mm',
              datetime: 'DD/MM/YYYY HH:mm',
          },
        },
      },
    }
  })
  app.vueApp.use(vuetify)
})