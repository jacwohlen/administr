<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Trainings</v-card-title>
          <v-data-table
            :headers="headers"
            :items="getTrainings()"
            item-key="title"
          >
            <template v-slot:item.dateFrom="{ item }">
              {{ item.dateFrom | formatDate }}
            </template>
            <template v-slot:item.dateTo="{ item }">
              {{ item.dateTo | formatDate }}
            </template>
            <template v-slot:item.info="{ item }">
              {{ item }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import moment from 'moment'
import { administraStore } from '~/store'
// import { Pool } from '~/types/models'

Vue.filter('formatDate', function (value: FirebaseFirestore.Timestamp) {
  if (typeof value.toDate === 'function') {
    return moment(value.toDate()).format('ddd hh:mm')
  }
})

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await administraStore.init()
  },
})
export default class CategoriesPage extends Vue {
  async mounted() {
    // client side
    await administraStore.init()
  }

  headers: any = [
    { text: 'Title', value: 'title' },
    { text: 'Start', value: 'dateFrom' },
    { text: 'End', value: 'dateTo' },
    { text: 'Sektion', value: 'section' },
    { text: 'Info', value: 'info' },
  ]

  getTrainings() {
    return administraStore.trainings
  }
}
</script>
