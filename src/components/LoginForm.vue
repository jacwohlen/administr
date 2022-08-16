<template>
  <v-card class="elevation-6" max-width="500px">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <AlertBox />
    <v-card-text>
      <div id="firebaseui-auth-container"></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class LoginPage extends Vue {
  mounted() {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth)
    const config = {
      signInOptions: [
        {
          provider: this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            hd: process.env.APP_GOOGLE_LOGIN_DOMAIN,
          },
        },
      ],
      signInSuccessUrl: '/dashboard',
      callbacks: {
        signInSuccessWithAuthResult() {
          // @ts-ignore
          window.location = '/dashboard'
        },
      },
    }
    ui.start('#firebaseui-auth-container', config)
  }
}
</script>
