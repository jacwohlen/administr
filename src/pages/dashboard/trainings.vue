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
          {{ getLastDateOfWeekday(t.weekday) }}
        </v-list-item-content>
        <v-list-item-action>
          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="'/dashboard/training/' + t.id">
                <v-list-item-title>View</v-list-item-title>
              </v-list-item>
              <v-list-item :to="t.id + '/' + getLastDateOfWeekday(t.weekday)">
                <v-list-item-title>Go to Presence List</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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

  getLastDateOfWeekday(weekday: string) {
    let currentWeekday: number = moment().isoWeekday()
    let targetWeekday: number = (<any>WEEKDAY)[weekday]
    let daysUntilTargetWeekday = targetWeekday - currentWeekday
    if (daysUntilTargetWeekday > 0) {
      daysUntilTargetWeekday = daysUntilTargetWeekday - 7
    }
    return moment().add(daysUntilTargetWeekday, 'days').format('yyyy-MM-DD')
  }

  get trainings() {
    return administraStore.trainings
  }
}
</script>
