import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import dotenv from 'dotenv'

dotenv.config()
// console.log("env NUXT_SECRET_API_KEY", process.env.NUXT_SECRET_API_KEY)
// console.log("env", process.env)
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/google-fonts',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.NUXT_SECRET_STORYBLOK_TOKEN,
        bridge: true,
        devtools: true,
        // enableSudoMode: true,
        apiOptions: {
          region: '' // Set 'US" if your space is created in US region (EU default)
        }
      }
    ]
  ],
  devServer: {
    https: {
      // key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      // cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    },
    port: 3005
  },
  googleFonts: {
    families: {
      Lato: [400, 700],
      Merriweather: [400, 700]
    }
  },
  app: {
    head: {
      titleTemplate: 'Observatorio Electoral Judicial',
      title: 'OEJ (Observatorio Electoral Judicial)',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {
          hid: 'description',
          name: 'description',
          content: 'Documentamos, analizamos y difundimos las decisiones, ' +
            'los problemas y toda la información relevante del proceso electoral ' +
            'del Poder Judicial 2024-2025'
        }
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  compatibilityDate: '2024-10-30'
})