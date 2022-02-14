<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="3" align="right">
            <v-btn text @click="backWeek"
              ><v-icon>mdi-arrow-left</v-icon> Week</v-btn
            >
          </v-col>
          <v-col align="center">
            <h1 class="text-h5" @click="today">{{ title }}</h1>
          </v-col>
          <v-col cols="3" align="left">
            <v-btn text @click="forwardWeek"
              ><v-icon>mdi-arrow-right</v-icon> Week</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <training-form :trainingId="trainingId" />
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

@Component({
  layout: 'DashboardLayout',
  asyncData({ params }) {
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
    return this.dateM.format('ddd, ll')
  }

  today() {
    const s = moment().format('yyyy-MM-DD')
    this.$router.push(s)
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
}
</script>
