<template>
  <div>
    <h1>
      {{ training.name }}
      (<small>{{ training.id }}</small>)
    </h1>
    <v-data-table
      :items="dates"
      :headers="members"
      items-per-page="-1"
      disable-sort
      hide-default-footer
      dense
      item-class="nowrap"
    >
      <template v-slot:item.date="{ item }">
        <tr>
          <td style="white-space: nowrap">{{ item.date }}</td>
        </tr>
      </template>
    </v-data-table>

    <h2>Table 2</h2>
    <table>
      <thead>
        <th>Names</th>
        <th v-for="d in dates" :key="d.value">{{ d.text }}</th>
      </thead>
      <tr v-for="m in members" :key="m.id">
        <td>{{ m.lastname }} {{ m.firstname }}</td>
        <td v-for="d in dates" :key="d.value">X</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import moment from 'moment'

import { Member } from '~/types/models'

import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async asyncData({ params }) {
    // await administraStore.init()
    await administraStore.initTraining({
      trainingId: params.trainingId,
    })
    await administraStore.initStats({
      trainingId: params.trainingId,
    })
    return { trainingId: params.trainingId }
  },
})
export default class extends Vue {
  date: moment.Moment | null = null
  dates: {}[] = []
  members: any = []

  get training() {
    return administraStore.training
  }

  get trainingLogs() {
    return administraStore.trainingLogs
  }

  mounted() {
    this.dates = this.getAllTrainingDays()
    const memb = []
    memb.push({ text: 'Dates', value: 'date' })
    this.trainingLogs.forEach((l) => {
      l.members.forEach((m: Member) => {
        if (!memb.find((a) => a.value.id === m.id)) {
          memb.push({ text: m.lastname + ' ' + m.firstname, value: m })
        }
      })
    })
    this.members = memb
  }

  getAllTrainingDays() {
    let date = moment().year(2022).month(0).date(1).day(8).isoWeekday(1)
    const dates = []
    if (date.date() > 7) {
      date = date.isoWeekday(-6)
    }
    while (dates.length < 52) {
      dates.push({
        X: moment(date).format('DD.MM.YYYY'),
        date: moment(date).format('YYYY-MM-DD'),
        // TODO: dates mit trainingslog ergzenzen...
      })
      date = date.add(7, 'days')
    }
    return dates
  }

  get items() {
    return [
      {
        name: 'Penelope',
        '2022-01-03': 'X',
        '2022-01-07': 'X',
        '2022-03-21': 'X',
      },
      {
        name: 'Peter',
        '2022-01-10': 'X',
        '2022-07-04': 'X',
        '2022-08-15': 'X',
      },
      {
        name: 'Enis',
        '2022-01-03': 'X',
        '2022-01-07': 'X',
        '2022-03-21': 'X',
      },
    ]
  }
}
</script>
