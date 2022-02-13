<template>
  <div>
    <h1><v-icon>mdi-calendar-check</v-icon> {{ title }}</h1>
    <v-card v-for="(t, idx) in trainings" :key="idx" class="mb-3">
      <v-card-title>
        {{ t.title }}
        <v-subheader>(id: {{ t.id }})</v-subheader>
      </v-card-title>
      <v-card-subtitle>
        {{ t.weekday }}, {{ t.dateFrom }} - {{ t.dateTo }}
        <v-chip small>{{ t.section }}</v-chip>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" text :to="'dashboard/' + t.id + '/' + todayStr">
          <v-icon left> mdi-format-list-checks </v-icon>
          Present List
        </v-btn>
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

  get title() {
    return this.today.format('ddd, LL')
  }

  get todayStr() {
    return this.today.format('yyyy-MM-DD')
  }

  get today() {
    return moment()
  }

  get trainings() {
    return administraStore.trainings
  }
}
</script>
