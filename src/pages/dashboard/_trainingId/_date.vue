<template>
  <div>
    <training-form :trainingId="trainingId" />
    <v-divider></v-divider>
    <v-row>
      <v-col align="right" class="mx-0 px-0">
        <v-btn text class="mr-0 pr-0" @click="backWeek">
          <v-icon>mdi-arrow-left</v-icon> Week
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col align="center" class="px-0">
        <v-dialog v-model="dialogDatePicker" width="unset">
          <template #activator="{ on, attrs }">
            <v-btn text class="px-0" color="primary" v-bind="attrs" v-on="on">
              {{ title }}
            </v-btn>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            :allowed-dates="allowedDates"
            @input="setDate"
          ></v-date-picker>
        </v-dialog>
      </v-col>
      <v-spacer></v-spacer>
      <v-col align="left" class="mx-0 px-0">
        <v-btn text class="ml-0 pl-0" @click="forwardWeek">
          Week
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <training-participant-list :trainingId="trainingId" :date="date" />
    <training-add-participant-box :trainingId="trainingId" />
    <v-btn text @click="back"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import moment from 'moment'

import { administraStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
  async asyncData({ params }) {
    await administraStore.init()
    await administraStore.initTraining({
      trainingId: params.trainingId,
    })
    await administraStore.initPresentList({
      trainingId: params.trainingId,
      date: params.date,
    })
    return { date: params.date, trainingId: params.trainingId }
  },
})
export default class PresentListPage extends Vue {
  trainingId: string = '' // set via asyncData
  date: string = '' // set via params asycData

  dateM: moment.Moment = moment()

  mounted() {
    this.dateM = moment(this.date, 'yyyy-MM-DD')
  }

  get title() {
    return this.dateM.format('L')
  }

  get day() {
    return this.dateM.format('dddd')
  }

  backWeek() {
    const s = this.dateM.subtract(7, 'days').format('yyyy-MM-DD')
    this.$router.push(s)
  }

  forwardWeek() {
    const s = this.dateM.add(7, 'days').format('yyyy-MM-DD')
    this.$router.push(s)
  }

  back() {
    this.$router.back()
  }

  dialogDatePicker = false
  setDate() {
    this.$router.push(this.date)
  }

  // FIXME: Refactor
  allowedDates(val: string) {
    const weekday = administraStore.training!.weekday
    let n
    if (weekday === 'Sunday') n = 0
    if (weekday === 'Monday') n = 1
    if (weekday === 'Tuesday') n = 2
    if (weekday === 'Wednesday') n = 3
    if (weekday === 'Thursday') n = 4
    if (weekday === 'Friday') n = 5
    if (weekday === 'Saturday') n = 6

    return new Date(val).getDay() === n
  }
}
</script>
