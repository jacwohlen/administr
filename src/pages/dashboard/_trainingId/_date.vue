<template>
  <div>
    <h1><v-icon>mdi-calendar-check</v-icon> {{ title }}</h1>
    <v-card>
      <v-card-text>
        <training-form :trainingId="trainingId" />
        <v-divider></v-divider>
        <training-participant-list :trainingId="trainingId" :date="date" />
        <training-add-participant-box :trainingId="trainingId" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import moment from 'moment'

@Component({
  layout: 'DashboardLayout',
  asyncData({ params }) {
    return { date: params.date, trainingId: params.trainingId }
  },
})
export default class PresentListPage extends Vue {
  trainingId: string = '' // set via asyncData
  date: string = '' // set via params asycData

  get title() {
    const d = moment(this.date, 'yyyy-MM-DD')
    return d.format('ddd, LL')
  }
}
</script>
