<template>
  <div>
    <h1 class="text-h1">{{ today }}</h1>
    <v-card>
      <v-card-title v-for="(t, idx) in trainings" :key="idx"
        >{{ t.title }}
        <v-list-item v-for="(m, idx2) in t.members" :key="idx2">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              {{ m.lastname }} {{ m.firstname }}
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import moment from 'moment'
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

  get today() {
    return moment().format('ddd, DD. MMM yyyy')
  }

  get trainings() {
    return administraStore.trainings
  }
}
</script>
