<template>
  <div>
    <h1>{{ todayStr }}</h1>
    <v-card v-for="(t, idx) in trainings" :key="idx">
      <v-card-title> {{ t.title }} (id: {{ t.id }}) </v-card-title>
      <v-card-subtitle>
        <v-chip>{{ t.section }}</v-chip></v-card-subtitle
      >
      <v-card-actions>
        <nuxt-link :to="'dashboard/' + t.id + '/' + todayStr"
          >Present List</nuxt-link
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import moment from 'moment'

import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await administraStore.init()
  },
})
export default class CategoriesPage extends Vue {
  async mounted() {
    // client side
    await administraStore.init()
  }

  get todayStr() {
    return moment().format('yyyy-MM-DD')
  }

  get today() {
    return moment()
  }

  get trainings() {
    return administraStore.trainings
  }
}
</script>
