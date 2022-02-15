<template>
  <div>
    <!-- <h1 align="center" class="text-h5" @click="goToday">{{ title }}</h1> -->
    <h1 align="center" class="text-h5" @click="goToday">{{ title }}</h1>
    <v-row class="pt-1">
      <v-col align="right">
        <v-btn text @click="goYesterday">
          <v-icon>mdi-arrow-left</v-icon> Back
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col align="left">
        <v-btn text @click="goTomorrow">
          Next
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item v-if="trainings.length === 0">
        <v-list-item-title align="center"> No Trainings </v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="(t, idx) in trainings"
        v-else
        :key="idx"
        :to="'dashboard/' + t.id + '/' + todayStr"
        class="mb-3"
      >
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
            icon
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
// FIXME: Rewrite with vue-class-component
import Component from 'vue-class-component'
import moment from 'moment'

import { Training } from '~/types/models'
import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // @ts-ignore
    await administraStore.initTrainingByWeekday(this.weekday)
  },
})
export default class extends Vue {
  date = moment()

  get trainings(): Training[] {
    return administraStore.trainingsByWeekday
  }

  get title(): string {
    const d = moment(this.date)
    return d.format('LL')
  }

  get todayStr(): string {
    const self = this
    const d = moment(self.date)
    return d.format('yyyy-MM-DD')
  }

  get weekday(): string {
    const self = this
    const d = moment(self.date)
    return d.format('dddd')
  }

  goTomorrow() {
    const d = moment(this.date)
    this.date = d.add(1, 'days')
    this.$fetch()
  }

  goYesterday() {
    const d = moment(this.date)
    this.date = d.subtract(1, 'days')
    this.$fetch()
  }

  goToday() {
    this.date = moment()
    this.$fetch()
  }
}
</script>
