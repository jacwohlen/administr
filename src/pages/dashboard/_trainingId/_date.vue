<template>
  <div>
    <v-row>
      <v-col>
        <h1>{{ date }}</h1>
        <AlertBox />
        <v-card width="50%">
          <training-form :trainingId="trainingId" />
          <v-divider></v-divider>
          <training-participant-list :trainingId="trainingId" :date="date" />
          <training-add-participant-box :trainingId="trainingId" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  layout: 'DashboardLayout',
  asyncData({ params }) {
    return { date: params.date, trainingId: params.trainingId }
  },
})
export default class PresentListPage extends Vue {
  trainingId: string = '' // set via asyncData
  date: string = '' // set via params asycData
}
</script>
