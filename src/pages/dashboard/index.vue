<template>
  <div>
    <h1 align="center" class="text-h5" @click="goToday">{{ title }}</h1>
    <v-row>
      <v-col align="right">
        <v-btn text @click="goYesterday"
          ><v-icon>mdi-arrow-left</v-icon> Yesterday</v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
      <v-col align="left">
        <v-btn text @click="goTomorrow">
          Tomorrow
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-for="(t, idx) in trainings" :key="idx" class="mb-3">
        <v-list-item-content>
          <v-list-item-title v-if="t.title">
            {{ t.title }}
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
            :to="'dashboard/' + t.id + '/' + todayStr"
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

  // FIX: why is moment becoming a string in title()
  // it should be an object of type moment as defined here
  // that's why moment(this.date) in all the functions
  date: moment.Moment = moment()

  get title() {
    const d = moment(this.date)
    return d.format('ddd, LL')
  }

  get todayStr() {
    const d = moment(this.date)
    return d.format('yyyy-MM-DD')
  }

  get weekday() {
    const d = moment(this.date)
    return d.format('DDD')
  }

  get trainings() {
    return administraStore.trainings
  }

  goTomorrow() {
    const d = moment(this.date)
    this.date = d.add(1, 'days')
  }

  goYesterday() {
    const d = moment(this.date)
    this.date = d.subtract(1, 'days')
  }

  goToday() {
    this.date = moment()
  }
}
</script>
