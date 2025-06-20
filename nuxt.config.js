import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'
dotenv.config()
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  build: {
    transpile: ['vuetify'],
  },
  ssr: true,
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
        cache: {
          clear: "auto",
          type: "memory",
        },
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
      cert: 'localhost.pem',
    },
    port: 3001,
  },
  googleFonts: {
    families: {
      Montserrat: [400, 700, 900],
      Oswald: [700],
      "PT+Serif": [700],
    },
    display: 'swap',
    preload: true,
    prefetch: true,
    preconnect: true
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  // alias: {
  //   vue: 'vue/dist/vue.esm-bundler.js'
  // },
  // vuetify: {
  //   autoImport: true,
  //
  //   styles: {
  //     configFile: 'assets/settings.scss',
  //   },
  // },
  // devtools: { enabled: true }
})
