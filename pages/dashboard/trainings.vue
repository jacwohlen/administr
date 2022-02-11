<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Trainings</v-card-title>
          <v-data-table
            :headers="headers"
            :items="trainings"
            item-key="title"
            hide-default-footer
          >
            <template #item.title="{ item }">
              <nuxt-link :to="'/dashboard/' + item.id">{{
                item.title
              }}</nuxt-link>
              (id: {{ item.id }})
            </template>
            <template #item.dateFrom="{ item }">
              {{ item.dateFrom }}
            </template>
            <template #item.dateTo="{ item }">
              {{ item.dateTo }}
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
    { text: 'Section', value: 'section' },
  ]

  get trainings() {
    return administraStore.trainings
  }
}
</script>
