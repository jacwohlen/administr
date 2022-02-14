<template>
  <div>
    <h1 align="center" class="text-h5">Members</h1>
    <v-data-table
      :headers="headers"
      :items="members()"
      item-key="id"
      hide-default-footer
      mobile-breakpoint="0"
    >
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { administraStore } from '~/store'

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
    { text: 'Firstname', value: 'firstname' },
    { text: 'Lastname', value: 'lastname' },
  ]

  members() {
    return administraStore.members
  }
}
</script>
