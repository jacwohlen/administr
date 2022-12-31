<template>
  <div>
    <h1 align="center" class="text-h5">Stats</h1>
    <v-row>
      <v-col>
        <h2>Top Athletes ({{ topParticipants.length }})</h2>
        <table>
          <tr>
            <th>Rank</th>
            <th>Participant</th>
            <th>Number of Trainings</th>
          </tr>
          <tr v-for="(l, index) in topParticipants" :key="l.m.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ l.m.lastname }} {{ l.m.firstname }}</td>
            <td>{{ l.count }}</td>
          </tr>
        </table>
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
  async fetch() {
    await administraStore.init()
    await administraStore.initAllLogs()
  },
})
export default class extends Vue {
  get topParticipants() {
    const topParticipants: { m: Member; count: number }[] = []

    administraStore.allLogs.forEach(({ members }) => {
      members.forEach((m) => {
        const foundIndex = topParticipants.findIndex((x) => x.m.id === m.id)
        if (foundIndex === -1) {
          topParticipants.push({ m, count: 1 })
        } else {
          topParticipants[foundIndex].count =
            topParticipants[foundIndex].count + 1
        }
      })
    })
    return topParticipants.sort((a, b) => b.count - a.count)
  }
}
</script>
