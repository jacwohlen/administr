<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Members</v-card-title>
          <v-data-table
            :headers="headers"
            :items="getMembers()"
            item-key="firstname"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'
// import { Pool } from '~/types/models'

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await administraStore.fetchAll()
  },
})
export default class CategoriesPage extends Vue {
  async mounted() {
    // client side
    await administraStore.fetchAll()
  }

  headers: any = [
    { text: 'Firstname', value: 'firstname' },
    { text: 'Lastname', value: 'lastname' },
  ]

  getMembers() {
    return administraStore.members
  }
}
</script>
