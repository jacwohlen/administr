<template>
  <div>
    <h1 align="center" class="text-h5">All Trainings</h1>
    <v-list>
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
        <v-list-item-action>
          <v-btn
            color="primary"
            text
            :to="t.id + '/' + getDateOfWeekday(t.weekday)"
          >
            <v-icon left> mdi-format-list-checks </v-icon>
            <span class="hidden-sm-and-down">Present List</span>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import moment from 'moment'
import { administraStore } from '~/store'
import { WEEKDAY } from '~/types/models'

Vue.filter('formatDate', function (value: FirebaseFirestore.Timestamp) {
  if (typeof value.toDate === 'function') {
    return moment(value.toDate()).format('ddd hh:mm')
  }
})

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    await administraStore.init()
  },
})
export default class extends Vue {
  headers: any = [
    { text: 'Title', value: 'title' },
    { text: 'Start', value: 'dateFrom' },
    { text: 'End', value: 'dateTo' },
    { text: 'Weekday', value: 'weekday' },
    { text: 'Section', value: 'section' },
  ]

  getDateOfWeekday(weekday: string) {
    let nToday: number = moment().isoWeekday()
    let n: number = (<any>WEEKDAY)[weekday]
    let date = undefined
    if (nToday >= n) {
      return moment()
        .add(nToday - n, 'days')
        .format('yyyy-MM-DD')
    } else {
      return moment()
        .add(-7 - (nToday - n), 'days')
        .format('yyyy-MM-DD')
    }
  }

  get trainings() {
    return administraStore.trainings
  }
}
</script>
