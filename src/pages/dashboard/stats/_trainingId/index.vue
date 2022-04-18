<template>
  <div>
    <h1>{{ training.name }}</h1>
    <v-data-table
      :items="dates"
      :headers="items"
      disable-sort
      hide-default-footer
      dense
    >
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
  dates: {}[] = []
  date: moment.Moment | null = null
  get training() {
    return administraStore.trainingLog
  }

  mounted() {
    this.date = moment().year(2022).month(0).date(1).day(8).isoWeekday(1)
    if (this.date.date() > 7) {
      this.date = this.date.isoWeekday(-6)
    }
    this.dates.push({ text: 'Name', value: 'name' })
    while (this.dates.length < 52) {
      this.dates.push({
        text: moment(this.date).week(), // format('DD.MM.YYYY'),
        value: moment(this.date).format('YYYY-MM-DD'),
        class: 'rotate',
      })
      this.date = this.date.add(7, 'days')
    }
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

  get members() {
    return [
      {
        id: '1',
        lastname: 'Penelope',
        firstname: 'Penelope',
      },
      {
        id: '2',
        lastname: 'Franz',
        firstname: 'Penelope',
      },
      {
        id: '3',
        lastname: 'Enis',
        firstname: 'Penelope',
      },
    ]
  }
}
</script>
