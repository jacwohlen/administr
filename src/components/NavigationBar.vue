<template>
  <v-app-bar app>
    <v-btn class="hidden-sm-and-down" text plain to="/">
      <v-avatar tile>
        <img
          src="~/assets/administra-logo.svg"
          height="70%"
          alt="administra logo"
        />
      </v-avatar>
      <h1 class="text-h5 ml-3 mr-3 hidden-sm-and-down">administra</h1>
    </v-btn>

    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = true"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" app temporary absolute>
      <v-list nav>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <img src="~/assets/administra-logo.svg" alt="administra logo" />
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Administra </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(l, idx) in links" :key="idx" :to="l.link">
          <v-list-item-title>
            {{ l.name }}
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item dense two-line>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense link @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-tabs centered color="grey darken-1">
      <v-tab v-for="(l, idx) in links" :key="idx" :to="l.link">
        <v-icon>{{ l.icon }}</v-icon>
        <span class="hidden-sm-and-down">{{ l.name }}</span>
      </v-tab>
    </v-tabs>

    <div class="hidden-sm-and-down">
      <v-menu bottom min-width="200px" offset-y>
        <template #activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              <h3 v-if="user">{{ user.email }}</h3>
              <v-divider class="my-3"></v-divider>
              <v-btn text @click="signOut">Logout</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { userStore } from '~/store'

export default {
  data: () => ({
    links: [
      { name: 'Today', link: '/dashboard', icon: 'mdi-calendar-check' },
      {
        name: 'Trainings',
        link: '/dashboard/trainings',
        icon: 'mdi-view-list-outline',
      },
      {
        name: 'Members',
        link: '/dashboard/members',
        icon: 'mdi-account-group-outline',
      },
      {
        name: 'Statistics',
        link: '/dashboard/statistics',
        icon: 'mdi-chart-line',
      },
    ],
    drawer: false,
  }),
  computed: {
    user() {
      if (userStore === undefined) {
        console.log('Error: userStore must not be undefined')
      }
      return userStore.user
    },
  },
  methods: {
    signOut() {
      userStore.signOut().then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
