import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'

import firebase from 'firebase/compat/app';

import { initializeStores, actions, plugins } from '~/store'

const localVue = createLocalVue()
localVue.use(Vuex)

const storeOptions = {
  actions,
  plugins,
  modules: {
  },
}

const createStore = (storeOptions: any = {}): Store<{ scheduler: any }> =>
  new Vuex.Store({ ...storeOptions })

const store = createStore(storeOptions)
initializeStores(store)

const firebaseOptions = {
  apiKey: process.env.APP_FIREBASE_API_KEY,
  authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.APP_FIREBASE_DATABASE_URL,
  projectId: process.env.APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.APP_FIREBASE_APP_ID,
}
const app = firebase.initializeApp(firebaseOptions)
firebase.firestore(app).useEmulator('localhost', 9000)
