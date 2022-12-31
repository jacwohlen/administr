<template>
  <div>
    <v-row class="pt-1" align="center" justify="center" no-gutters>
      <v-col align="left">
        <v-btn text @click="back"> <v-icon>mdi-arrow-left</v-icon> Back </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <training-form :trainingId="trainingId" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 align="center" class="text-h5">Stats</h1>
        <v-sparkline
          :value="val"
          :labels="val"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        />
        <table>
          <tr>
            <th>Date</th>
            <th># Participants</th>
          </tr>
          <tr v-for="d in values" :key="d.date">
            <td>{{ d.date }}</td>
            <td>{{ d.count }}</td>
          </tr>
        </table>
      </v-col>
      <v-col>
        <h1 align="center" class="text-h5">Top Participants</h1>
        <table>
          <tr>
            <th>Participant</th>
            <th>Number of Trainings</th>
          </tr>
          <tr v-for="l in topParticipants" :key="l.m.id">
            <td>{{ l.m.lastname }} {{ l.m.firstname }}</td>
            <td>{{ l.count }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <v-row class="pt-1" align="center" justify="center" no-gutters>
      <v-col align="left">
        <v-btn text @click="back"> <v-icon>mdi-arrow-left</v-icon> Back </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'
import { Member } from '~/types/models'

@Component({
  layout: 'DashboardLayout',
  async asyncData({ params }) {
    await administraStore.initLogsByTraining({ trainingId: params.id })
    return { trainingId: params.id }
  },
})
export default class PresentListPage extends Vue {
  trainingId: string = '' // set via asyncData

  get logs() {
    return administraStore.logsByTraining
  }

  get values() {
    return this.logs.map((x) => ({ date: x.id, count: x.members.length }))
  }

  get val() {
    return this.values.map((x) => x.count)
  }

  get labels() {
    return this.values.map((x) => x.date)
  }

  get topParticipants() {
    const topParticipants: { m: Member; count: number }[] = []
    this.logs.forEach(({ members }) => {
      members.forEach((m) => {
        let foundIndex = topParticipants.findIndex((x) => x.m.id === m.id)
        if (-1 === foundIndex) {
          topParticipants.push({ m, count: 1 })
        } else {
          topParticipants[foundIndex].count =
            topParticipants[foundIndex].count + 1
        }
      })
    })
    return topParticipants.sort((a, b) => b.count - a.count)
  }

  back() {
    this.$router.back()
  }
}
</script>
