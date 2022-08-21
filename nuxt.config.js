import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'
import path from 'path'

export default {
  srcDir: 'src/',
  target: 'static',
  ssr: false,
  generate: {
    fallback: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config, { isDev, isClient }) {
      if (!isDev && isClient) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './src/pages/**/*.vue'),
              path.join(__dirname, './src/layouts/**/*.vue'),
              path.join(__dirname, './src/components/**/*.vue'),
            ]),
            whitelist: ['html', 'body'],
          })
        )
      }
    },
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'administra',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',

    [
      '@nuxtjs/vuetify',
      {
        theme: {
          themes: {
            light: {
              primary: '#ff0000',
              secondary: '#e0e0e0',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
            },
          },
        },
      },
    ],
  ],

  // Make env available to nuxt components
  env: {
    APP_GOOGLE_LOGIN_DOMAIN: process.env.APP_GOOGLE_LOGIN_DOMAIN,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.APP_FIREBASE_API_KEY,
          authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.APP_FIREBASE_DATABASE_URL,
          projectId: process.env.APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.APP_FIREBASE_APP_ID,
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedAction: 'users/onAuthStateChanged',
              // emulatorPort:
              //   process.env.NODE_ENV === 'development' ? 9099 : undefined,
              // emulatorHost: 'localhost',
            },
          },
          firestore: {
            // emulatorPort:
            //   process.env.NODE_ENV === 'development' ? 9000 : undefined,
            // emulatorHost: 'localhost',
          },
        },
      },
    ],
    ['vue-web-cam/nuxt'],
  ],

  router: {
    middleware: ['router-auth'],
  },
}
