<template>
  <div>
    <h1 align="center" class="text-h5">All Trainings</h1>
    <v-data-table
      class="hidden-sm-and-down"
      :items="trainings"
      :headers="headers"
      hide-default-footer
      disable-sort
    >
    </v-data-table>
    <v-list class="hidden-md-and-up">
      <v-list-item
        v-for="(t, idx) in trainings"
        :key="idx"
        class="mb-3"
        two-line
      >
        <v-list-item-content>
          <v-list-item-title v-if="t.title">
            {{ t.title }} <small>(id: {{ t.id }})</small>
          </v-list-item-title>
          <v-list-item-title v-else> (id: {{ t.id }}) </v-list-item-title>
          <v-list-item-subtitle>
            {{ t.weekday }}, {{ t.dateFrom }} - {{ t.dateTo }}
            <v-chip small>{{ t.section }}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import moment from 'moment'
import { administraStore } from '~/store'

Vue.filter('formatDate', function (value: FirebaseFirestore.Timestamp) {
  if (typeof value.toDate === 'function') {
    return moment(value.toDate()).format('ddd hh:mm')
  }
})

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await administraStore.init()
  },
})
export default class extends Vue {
  async mounted() {
    // client side
    await administraStore.init()
  }

  headers: any = [
    { text: 'Title', value: 'title' },
    { text: 'Start', value: 'dateFrom' },
    { text: 'End', value: 'dateTo' },
    { text: 'Weekday', value: 'weekday' },
    { text: 'Section', value: 'section' },
  ]

  get trainings() {
    return administraStore.trainings
  }
}
</script>
