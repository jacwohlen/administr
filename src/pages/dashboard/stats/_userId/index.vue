<template>
  <div>
    <h1>{{ userId }} - {{ date }}</h1>
    <v-data-table dense :headers="dates" :items="items" :item-key="name">
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { administraStore } from '~/store'
import moment from 'moment'

@Component({
  layout: 'DashboardLayout',
  async asyncData({ params }) {
    // await administraStore.init()
    await administraStore.initStats({
      trainingId: params.userId,
    })
    return { userId: params.userId }
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
    this.dates.push({ text: 'Judoka', value: 'name' })
    while (this.dates.length < 52) {
      this.dates.push({
        text: moment(this.date).format('DD.MM.YYYY'),
        value: moment(this.date).format('YYYY-MM-DD'),
      })
      this.date = this.date.add(7, 'days')
    }
    console.log(this.dates)
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

<style>
.rotate {
  transform: rotate(-90deg);
}
</style>