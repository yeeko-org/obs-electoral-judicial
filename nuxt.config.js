import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import dotenv from 'dotenv'

dotenv.config()
console.log("HOLA NUXT!")
console.log("env NUXT_SECRET_API_KEY", process.env.NUXT_SECRET_API_KEY)
console.log("env NUXT_SECRET_STORYBLOK_TOKEN", process.env.NUXT_SECRET_STORYBLOK_TOKEN)
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
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.NUXT_SECRET_STORYBLOK_TOKEN,
        // bridge: true,
        // devtools: true,
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
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },

  compatibilityDate: '2024-10-30'
})